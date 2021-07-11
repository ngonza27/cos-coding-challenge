import { IAuthenticationClientData } from "./IAuthenticationClientData";

export interface IAuthenticationClient {
    authenticateUser(): Promise<IAuthenticationClientData>;
}