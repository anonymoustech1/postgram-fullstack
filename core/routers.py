from rest_framework import routers
from core.user.viewsets import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.post.viewsets import PostViewSet
from rest_framework_nested import routers
from core.comment.viewsets import CommentViewSet
router = routers.SimpleRouter()

# CHANGE THIS LINE
router = routers.DefaultRouter()

#* ###################################################### #*
#* #################### USER ########################## #*
#* ###################################################### #*
router.register(r'user', UserViewSet, basename='user')
router.register(r'post', PostViewSet, basename='post')

#* ######################################################## *#
#* ######################################################## *#



#* ########################################################## #*
#* #################### AUTH ############################ #*
#* ########################################################## #*
router.register(r"auth/register", RegisterViewSet, basename="auth-register")
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# * ############################################################## * #
# * ##################### Post..... ############################# * #
# * ############################################################# * #
posts_router = routers.NestedSimpleRouter(router, r"post", lookup="post")
posts_router.register(r"comment", CommentViewSet, basename="post-comment")

urlpatterns = [
    *router.urls, 
    *posts_router.urls,
]