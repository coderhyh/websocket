import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import { Server } from "socket.io";
import http from "http";

import config from './config'

const app: Express = express();
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requestd-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("file"));
const api_router: Router = express.Router();
app.use("/api", api_router);
require('./modules/interface/api_router')(api_router)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.SOCKET_CORS_ORIGIN
  },
});
require("./modules/socket")(io);

server.listen(config.PROT, () => {
  console.log(`http://127.0.0.1:${config.PROT}`);
});
