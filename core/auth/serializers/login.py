# Import necessary classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from core.user.serializers import UserSerializer


 
class LoginSerializer(TokenObtainPairSerializer):
    """
    Customizes the JWT TokenObtainPairSerializer to return user data
    along with the access and refresh tokens upon a successful login.
    """
    def validate(self, attrs):
        """
        Validates the user's credentials and generates tokens.

        Args:
            attrs (dict): A dictionary containing the user's credentials (e.g., 'username' and 'password').

        Returns:
            dict: A dictionary containing the user's details, access token, and refresh token.
        """

        # Step 1: Call the parent class's validate method
        # This handles the default token generation logic, which includes
        # authenticating the user and raising an exception for invalid credentials.
        data = super().validate(attrs) # “super is helpful here. It’s a built-in method in Python that returns a temporary object that  can be used to access the class methods of the base class.”


        # Step 2: Get the refresh token
        # This retrieves the refresh token object for the authenticated user.
        refresh = self.get_token(self.user)
        

        # Step 3: Add user data to the response
        # The UserSerializer is used to serialize the user object into a dictionary.
        # This is then added to the response data under the 'user' key.
        # data['user'] = UserSerializer(self.user).data
        data["user"] = UserSerializer(self.user, context={"request": self.context.get("request")}).data
        # Step 4: Add the refresh token to the response
        # The refresh token object is converted to a string representation and
        # stored under the 'refresh' key in the response.
        data['refresh'] = str(refresh)

        # Step 5: Add the access token to the response
        # The access token is obtained from the refresh token object,
        # converted to a string, and stored under the 'access' key.
        data['access'] = str(refresh.access_token)
       

        # Step 6: Update the user's last login timestamp
        # The `api_settings.UPDATE_LAST_LOGIN` check is a conditional flag
        # to determine if the user's last login time should be updated.
        # This is a feature of Django's auth system.
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        # Step 7: Return the customized data dictionary
        # This dictionary, containing the user data, access token, and refresh token,
        # is what will be sent back in the API response.
        return data;