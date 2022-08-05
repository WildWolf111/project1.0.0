import { authHeader } from './auth-header';
import axios from 'axios'

export const userService = {
    login,
    logout,
    register,
    getAll,
};

function login(email, password) {

    //ссылочный тип переменной data//
    let data = {
        login: email,
        password: password,




    };
    console.log(data)



    return axios.post('/api/v2/users/auth', data)
        .then(handleResponse => {
            console.log(handleResponse)
            console.log(handleResponse.data.message)
            if (handleResponse.data.message != '') {
                let responseJson = {

                    login: handleResponse.data.User.login,
                    role: handleResponse.data.User.Role,
                    token: handleResponse.data.Token,




                };


                console.log(responseJson)
                localStorage.setItem('user', JSON.stringify(responseJson));


                return responseJson;

            }







        });


}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text(text).then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}