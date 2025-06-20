import axios from '../services/axios';

import { createContext, useContext } from "react";

const params = new URLSearchParams();
params.append('grant_type', 'password');

params.append('username', 'username');
params.append('password', 'password');


export const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
const useAuthProvider = () => {


};


export const logout = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  
  };
export const refreshToken = function(reload = true) {
    
    let requestTokenParams = new URLSearchParams();
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    requestTokenParams.append('grant_type', 'refresh_token');
    requestTokenParams.append('refresh_token', localStorage.getItem('refresh_token'));
    axios
        .post(`https://em2w.azurewebsites.net/api/connect/token`, requestTokenParams, {
            headers: headers
        })
        .then(
            (res) => {
                localStorage.setItem('access_token', res.data.access_token);
                axios.defaults.headers.common['Authorization'] = res.data.access_token;
                setRefreshTimeout(res.data.expires_in)
                if(reload)
                    window.location.reload();
            },
            (err) => {
                console.log(err);
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token");
                window.location.href = "/login";
                return null;
            }
        );
};

export const getCurrentToken = () => {
    return localStorage.getItem("refresh_token");
};



export const setRefreshTimeout = function (seconds) {
    setTimeout(function () {
        refreshToken(true)
    }, seconds*900); //multiplying by 900 instead of 1000 since we want to refresh it few minutes before it expires
}