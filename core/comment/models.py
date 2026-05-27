import uuid
from django.db import models
from core.abstract.models import AbstractModel, AbstractManager


class CommentManager(AbstractManager):
    pass


class Comment(AbstractModel):
    post = models.ForeignKey("core_post.Post", on_delete=models.PROTECT)
    author = models.ForeignKey("core_user.User", on_delete=models.PROTECT)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    public_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    objects = CommentManager()
    
    def __str__(self):
        return self.author.name