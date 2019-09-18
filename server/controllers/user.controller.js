import bcrypt from 'bcrypt';
import Response from '../utils/helpers/response';
import { USERS } from '../utils/data/user';
import UserModel from '../models/user.model';

class userController {
  static async signUp(req, res) {
    try {
      const newUser = req.body;
      const hashedPassword = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10), null);
      newUser.password = hashedPassword;
      const newId = USERS.length + 1;
      newUser.id = newId;
      const user = new UserModel({ ...newUser });
      if (!await user.signUp()) {
        return Response.handleError(409, 'Email already exist', res);
      }
      return Response.handleSuccess(201, 'Successfully Created', user.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async signIn(req, res) {
    try {
      // res.locals.user = req.user;
      const { email, password } = req.body;
      const signInUser = new UserModel(email);
      if (await signInUser.signIn()) {
        if (bcrypt.compareSync(password, signInUser.result.password)) {
          return Response.handleSuccess(200, 'User sign in successfully', signInUser.result, res);
        }
        return Response.handleError(401, 'Wrong password. Please try again', res);
      }
      return Response.handleError(404, 'Sorry, we do not recognize this email', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default userController;
