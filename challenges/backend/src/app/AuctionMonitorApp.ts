import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger, 
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        const auctions = await this.carClient.getRunningAuctions();
        auctions.forEach(element => this.logger.log(JSON.stringify(element)))
    }

}
