import * as Yup from "yup";
import User from "../models/User";
import authConfig from "../../config/auth";
import jwt from "jsonwebtoken";

class SessionsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    const userEmailOrPasswordIncorrect = () =>
      res
        .status(400)
        .json({ error: "Make sure your password or email are correct" });

    if (!(await schema.isValid(req.body))) userEmailOrPasswordIncorrect();

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) userEmailOrPasswordIncorrect();

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect();

    return res.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionsController();
