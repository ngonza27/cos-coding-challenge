import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import { IAuthenticationClient } from "./services/AuthenticationClient/interface/IAuthenticationClient";
import { AuthenticationClient } from "./services/AuthenticationClient/classes/AuthenticationClient";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IAuthenticationClient>(DependencyIdentifier.AUTHENTICATION).to(AuthenticationClient);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
