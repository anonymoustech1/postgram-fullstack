import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    const { user } = auth;

     // If no user, redirect to login

    return user ? <>{ children }</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;

/** what are just did here is: 
 * in the preceding code snippet, we are retrieving the user property from localStorage.
We then use this property to check whether we should redirect the user to the login page or render the page (children). If user is null or undefined, it means that the user has not logged in, so we redirect the user to the login page, otherwise, we give access to the asked page.
 * 
 */















/** Let Explain what are Protected Route:
 * 
 * “Routing with the condition on a frontend application is a big plus, as it helps with a better user experience. For example, if you are not logged in to Twitter or instagram and want to check a profile or comment, you will be redirected to the login page. These are protected pages or actions, so you must log in before accessing these resources”

 */