import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { StateRoutes } from "../routes/state_routes";
import { CityRoutes } from "../routes/city_routes";
import { CommonRoutes } from "../routes/common_routes";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

   private StateRoutes: StateRoutes = new StateRoutes();
   private CityRoutes: CityRoutes = new CityRoutes();
   private CommonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.app.use(cors());
      this.config();
      this.mongoSetup();
      this.StateRoutes.route(this.app);
      this.CityRoutes.route(this.app)
      this.CommonRoutes.route(this.app);
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;
