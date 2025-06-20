import React, { useState } from "react"
import Button from "../../components/button/Button"
import "./Login.css"
import { useForm } from "react-hook-form"
import axios from '../../services/axios';

import { useNavigate } from 'react-router-dom';
import { setRefreshTimeout } from "../../hooks/useAuth"
const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = data => {
        let requestTokenParams = new URLSearchParams();
								requestTokenParams.append('grant_type', 'password');
								requestTokenParams.append('username', data.username);
								requestTokenParams.append('password', data.password);
								requestTokenParams.append('scope', 'openid offline_access');
                          
        axios.post(`https://em2w.azurewebsites.net/api/connect/token`, requestTokenParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
   
    }}).then((response) => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('expires_in', response.data.expires_in);
            setRefreshTimeout(response.data.expires_in);

            navigate('/');
        }).catch(error => {
            if (error.response) {
                setErrorMessage(error.response.data.error_description)
              }
        })
    }
    return (
        <form className="form-wrapper login" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-title"><img alt="logo" src="/img/energy-manager-logo.png" /></div>
            {(errorMessage !== '') ? <div className="error">
                <div>{errorMessage}</div>
            </div> : ''}
            <div className="data-input-wrapper">
                <div className="input-wrapper">
                    <div className="form-label">
                        Email
                    </div>
                    <input type="text" id="username" {...register('username', { required: true })}/>
                </div>
                <div className="input-wrapper input-bottom">
                    <div className="form-label">
                        Password
                    </div>
                    <input type="password" id="password" {...register('password', { required: true })}/>
                </div>
                <div className="button">
                    <Button primary="true" label="Log in" />
                </div>
            </div>
        </form> 
    )
}

export default Login;