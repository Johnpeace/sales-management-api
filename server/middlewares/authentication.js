import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Response from '../utils/helpers/response';
import Check from '../utils/helpers/check';
import { USERS } from '../utils/data/user';

config();

const userToken = async (req, res, next) => {
  try {
    const token = await Check.checkToken(req);
    if (!token) return Response.handleError(403, 'Token required, please sign in or register as a user', res);
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return Response.handleError(401, error.message, res);
      const payload = user.payload;
      const obj = Object.values(payload).join('');
      const loginUser = USERS.find((user) => {
        if (user.email === obj) return true;
        return true;
      });
      res.locals.user = loginUser;
      next();
    });
  } catch (error) {
    return Response.handleError(500, error.message, res);
  }

  // try {
  //   const token = await Check.checkToken(req);
  //   if (!token) return Response.handleError(403, 'Token required. Please sign in or register as a user', res);
  //   jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
  //     if (error) return Response.handleError(401, error.message, res);
  //     res.locals.user = user;
  //     next();
  //   });
  // } catch (error) {
  //   return Response.handleError(500, error.message, res);
  // }


};

export default { userToken };
