// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from "yup";
import User from "../models/User";

class SessionsController {
  // eslint-disable-next-line class-methods-use-this
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

    return res.json({ id: user.id, email, name: user.name, admin: user.admin });
  }
}

export default new SessionsController();
