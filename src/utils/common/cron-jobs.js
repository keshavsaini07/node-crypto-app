import cron from "node-cron";
import { UserService } from "../../services/index.js";

function scheduleCrons() {
    console.log("in cron")
  cron.schedule("*/10 * * * *",
    UserService.fetchEthereumPrice
  );
}

export { scheduleCrons };
