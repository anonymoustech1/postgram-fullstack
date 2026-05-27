import pytest
from core.user.models import User

data_user = {
    "username": "christiandelson293",
    "email": "christiandelson293@gmail.com",
    "first_name": "christian",
    "last_name": "delson",
    "password": "chris@33"
}
@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(**data_user)