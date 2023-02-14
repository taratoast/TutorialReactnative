import { ApiToken } from "./ApiService";
import { HttpClient } from "./HttpClient";
import { HOSTTOKEN,PORTTOKEN } from "./Global";

export const getToken = (email, pass) => {
    const json = {
        Email: email,
        Password: pass,
        Appid: "JOINS"
    };
    console.log('HOSTTOKEN', HOSTTOKEN);
    console.log('PORTTOKEN', PORTTOKEN);

    const tokenResult = HttpClient(HOSTTOKEN,PORTTOKEN).post(ApiToken.getToken, json)
        .then((response) => {
            if (response.status == 200) {
                return response.data.data.token
            } else {

            }
        })
        .catch((error) => {
            console.error(error);
        });
        
    console.log('TokenResult: ',tokenResult)
    return tokenResult
}