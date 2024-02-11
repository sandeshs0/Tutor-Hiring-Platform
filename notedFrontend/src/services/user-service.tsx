import { myAxios } from "./helper";

export const Register = (user)=>{
    return myAxios
    .post('/user/save', user)
    .then((response)=> response.data)

};

export const Login = (credentials) => {
    return myAxios
    .post('/user/login',  credentials)
    .then((response)=>response.data)
}