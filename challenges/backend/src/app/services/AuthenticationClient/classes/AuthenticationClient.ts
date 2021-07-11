import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import { IAuthenticationClientData } from "../interface/IAuthenticationClientData";
import { injectable } from "inversify";
import axios from "axios";

@injectable()
export class AuthenticationClient implements IAuthenticationClient {

    public constructor() { }

    public async authenticateUser(): Promise<IAuthenticationClientData>{
        try {
            const response = axios.put("https://api-core-dev.caronsale.de/api/v1/authentication/salesman@random.com",
             { "password": "123test", "meta": "string" })
            
            return Promise.resolve(response).then((res) => {
                return  { token: res.data.token, 
                          authenticated: res.data.authenticated, 
                          userId: res.data.userId
                        }            
            });
        } catch (err) {
            throw err;
        }
    }
}
