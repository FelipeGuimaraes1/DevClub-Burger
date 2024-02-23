import { Router } from "express";
import { v4 } from "uuid";

import User from "./app/models/User";

const routes = new Router();

routes.get("/", async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: "Felipe",
    email: "felipe@email.com",
    password_hash: "123312"
  });
  return res.json(user);
});

export default routes;
