# Import necessary modules from Django REST Framework
from rest_framework.response import Response  # Used to return HTTP responses
from rest_framework import status  # HTTP status codes (200, 201, 404, etc.)
from rest_framework.decorators import action  # Decorator for custom endpoints
from django.core.cache import cache  # Django's caching system to store/retrieve data

# Import custom classes from your project
from core.abstract.viewsets import AbstractViewSet  # Base viewset with common functionality
from core.post.models import Post  # Post model for database operations
from core.post.serializers import PostSerializer  # Converts Post objects to/from JSON
from core.auth.permissions import UserPermission  # Custom permission class


class PostViewSet(AbstractViewSet):
    """
    ViewSet for managing Post objects.
    Provides CRUD operations and custom actions (like, remove_like).
    """
    
    # Define which HTTP methods this viewset accepts
    # NOTE: 'patch' is missing - this is why PATCH requests fail!
    http_method_names = ("post", "get", "put", "delete")
    
    # Permission class that checks if user has rights to perform actions
    permission_classes = (UserPermission,)
    
    # Serializer used to convert Post objects to JSON and validate input data
    serializer_class = PostSerializer
    
    # Allows filtering posts by author's public_id (e.g., /post/?author__public_id=123)
    filterset_fields = ["author__public_id"]

    def get_queryset(self):
        """
        Returns the base queryset of all posts.
        This is called before filtering, pagination, etc.
        """
        return Post.objects.all()

    def get_object(self):
        """
        Retrieves a single post by its public_id from URL parameters.
        Example: /post/abc123/ -> kwargs["pk"] = "abc123"
        Also checks if the user has permission to access this specific post.
        """
        # Get post using custom manager method
        obj = Post.objects.get_object_by_public_id(self.kwargs["pk"])
        
        # Check object-level permissions (e.g., can this user edit this post?)
        self.check_object_permissions(self.request, obj)
        
        return obj

    def list(self, request, *args, **kwargs):
        """
        Handles GET /post/ - Returns a list of all posts.
        Implements caching to improve performance.
        """
        # Try to get posts from cache first (faster than database query)
        post_objects = cache.get("post_objects")
        
        # If posts not in cache (cache miss), fetch from database
        if post_objects is None:
            # Apply any filters from URL parameters (e.g., author__public_id)
            post_objects = self.filter_queryset(self.get_queryset())
            
            # Store the queryset in cache for future requests
            # WARNING: This caches ALL posts, which can cause stale data issues
            cache.set("post_objects", post_objects)
        
        # Paginate the results (split into pages of X items)
        page = self.paginate_queryset(post_objects)
        
        # If pagination is enabled and results fit in pages
        if page is not None:
            # Convert the page of posts to JSON format
            serializer = self.get_serializer(page, many=True)
            # Return paginated response with metadata (next, previous, count)
            return self.get_paginated_response(serializer.data)
        
        # If no pagination, return all posts at once
        serializer = self.get_serializer(post_objects, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Handles POST /post/ - Creates a new post.
        """
        # Get the serializer with data from request body
        serializer = self.get_serializer(data=request.data)
        
        # Validate the data (checks required fields, data types, etc.)
        # raise_exception=True returns 400 error if validation fails
        serializer.is_valid(raise_exception=True)
        
        # Save the new post to database (calls serializer.save())
        # This may set additional fields like author = request.user
        self.perform_create(serializer)
        
        # Return the created post data with 201 Created status
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["post"], detail=True)
    def like(self, request, *args, **kwargs):
        """
        Custom action: POST /post/{id}/like/
        Allows a user to like a post.
        detail=True means this operates on a single post (requires ID in URL).
        """
        # Get the specific post being liked
        post = self.get_object()
        
        # Get the currently authenticated user
        user = self.request.user
        
        # Call custom method on User model to create a like relationship
        # This probably adds an entry to a Like table or many-to-many relationship
        user.like_post(post)
        
        # Serialize the updated post (now includes this user's like)
        # context={"request": request} passes request data to serializer
        serializer = self.serializer_class(post, context={"request": request})
        
        # Return the updated post data with 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, instance, validated_data):
        print(validated_data)
        if not instance.edited:
            validated_data['edited'] = True
        instance = super().update(instance, validated_data)
        return instance
    
    

    @action(methods=["post"], detail=True)
    def remove_like(self, request, *args, **kwargs):
        """
        Custom action: POST /post/{id}/remove_like/
        Allows a user to unlike a post they previously liked.
        """
        # Get the specific post being unliked
        post = self.get_object()
        
        # Get the currently authenticated user
        user = self.request.user
        
        # Call custom method on User model to remove the like relationship
        # This probably deletes an entry from a Like table
        user.remove_like_post(post)
        
        # Serialize the updated post (now without this user's like)
        serializer = self.serializer_class(post, context={"request": request})
        
        # Return the updated post data with 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)


"""
IMPORTANT ISSUES IN THIS CODE:

1. MISSING 'patch' IN http_method_names:
   - Your http_method_names only includes 'put', not 'patch'
   - DRF uses PATCH for partial updates by default
   - FIX: Add 'patch' to the tuple:
     http_method_names = ("post", "get", "put", "patch", "delete")

2. CACHE INVALIDATION PROBLEM:
   - The list() method caches all posts indefinitely
   - When a new post is created, the cache still shows old data
   - FIX: Clear cache after create/update/delete:
     def create(self, request, *args, **kwargs):
         response = super().create(request, *args, **kwargs)
         cache.delete("post_objects")  # Clear cache
         return response

3. MISSING UPDATE METHOD:
   - You override create() but not update()
   - PUT requests use the update() method from AbstractViewSet
   - If AbstractViewSet doesn't have it, PUT will fail
   - FIX: Either ensure AbstractViewSet has update(), or add:
     def update(self, request, *args, **kwargs):
         partial = kwargs.pop('partial', False)
         instance = self.get_object()
         serializer = self.get_serializer(instance, data=request.data, partial=partial)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         cache.delete("post_objects")  # Clear cache
         return Response(serializer.data)

4. SECURITY CONCERN:
   - like() and remove_like() actions use POST method
   - But they don't validate any request data
   - This is fine if no data is needed, but consider using permission checks

5. PERFORMANCE ISSUE:
   - Caching the entire queryset can consume lots of memory
   - Consider using cache pagination keys instead
   - Or use Redis with TTL (time-to-live) expiration
"""