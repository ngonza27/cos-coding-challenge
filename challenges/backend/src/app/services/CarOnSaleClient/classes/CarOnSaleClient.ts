import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import { IAuthenticationClient } from "../../AuthenticationClient/interface/IAuthenticationClient"

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor (@inject("authentication") private authentication: IAuthenticationClient) {}

    public async getRunningAuctions(){
        const token = await this.authentication.authenticateUser();
        console.log("Token:", token);
    }

}