//  MÉTODOS MVC:
// store   => Cadastrar / Adicionar
// index   => Listar vários
// show    => Listar apenas UM
// update  => Atualizar
// delete  => Deletar

import { v4 } from "uuid";

import User from "../models/User";

class UserController {
  async store(req, res) {
    const { name, email, password_hash, admin } = req.body;

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin
    });

    return res.json(user);
  }
}
