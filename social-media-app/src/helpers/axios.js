import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken, getUser } from "../hooks/user.actions";

// Axios-auth-refresh are react libery for  performinng automatic token refresh with via exios interceptions 


const axiosService = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosService.interceptors.request.use(async (config) => {
    /** 
     Retrieving the access token from a localstorage and adding it to the headers of request 
    
    */
//    const { access } = JSON.parse(localStorage.getItem("auth"));

    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;

});

axiosService.interceptors.response.use(
    (res)=> Promise.resolve(res),
    (err)=> Promise.reject(err),
);


const refreshAuthLogic = async (failedRequest) => {
    // const { refresh } = JSON.parse(localStorage.getItem("auth"))

    return axios
    
    .post("/api/auth/refresh/token/", null, {
        baseURL: "http://localhost:8000",

        headers: {
            // Authorization: `Bearer ${getAccessToken}`,
            Authorization: `Bearer ${getRefreshToken()}`,
        },
    })

    .then((resp)=>{
        const { access} = resp.data;

        // failedRequest.response.config.headers["Authorization" ] = "Bearer" + access;
        failedRequest.response.config.headers["Authorization"] = `Bearer ${access}`;

        localStorage.setItem("auth", JSON.stringify({
            access, 
            refresh: getRefreshToken(),
            user: getUser()
        }));
    })
    .catch(()=>{
        localStorage.removeItem("auth");
    });
};

/**
 Here i create and initialize and authentication interceptor to create a custom fetcher i.e the fetch will be use to make a 'Get' request on the API resources;
 */
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);
export function fetcher(url){

    return axiosService.get(url)
    .then((res) => res.data);
};
export default axiosService

/** After defining the axios auth;  now the next step is to create a protected route wrapper 
 *  step to create a protected route wrapper in our frontend you have to follow the step below 
 * 
 * 1. create a new directory or packgae and what i mean by package is also a directory, call the directory routes
 * 
 * 2. inside the newly created directory create a file called ProtectedRoute.jsx.
 * 
 * 3. once the file is created import the Needed libraries.
*/
