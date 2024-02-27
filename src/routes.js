import { Router } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionsController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import authMiddleware from "./app/middlewares/auth";

const upload = multer(multerConfig);
const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/sessions", SessionsController.store);

routes.use(authMiddleware); // será chamado por todas as rotas ABAIXO

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

export default routes;
