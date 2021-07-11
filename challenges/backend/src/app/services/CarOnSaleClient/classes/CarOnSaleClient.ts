import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import { IAuthenticationClient } from "../../AuthenticationClient/interface/IAuthenticationClient"
import axios from "axios";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor (@inject("authentication") private authentication: IAuthenticationClient) {}

    public async getRunningAuctions() {

        const authToken = await this.authentication.authenticateUser();
        
        try {
            const auctions = axios.get("https://api-core-dev.caronsale.de/api/v2/auction/buyer/?filter",
            { headers: {'authtoken': authToken.token, 'userid': 'salesman@random.com' }} );
            
            return Promise.resolve(auctions).then((res) => {
                return res.data.items.map( (item: any) => {
                    return {
                        totalRunningAuctions: this.getNumberOfRunningAuctions(res.data),
                        averageNumberOfBids: this.getAverageNumberOfBids(res.data.total, item),
                        averageAuctionProgress: this.getAverageAuctionProgress(item)
                    }   
                });            
            });
            } catch (error) {
                throw -1
            }
    }

    public getNumberOfRunningAuctions(data: any) {
        return data.total;   
    }

    public getAverageNumberOfBids(length: any, item: any) {
        return (item.numBids / length)
    }

    public getAverageAuctionProgress(data: any) {
        return (data.currentHighestBidValue / data.minimumRequiredAsk) * 100
    }

}
