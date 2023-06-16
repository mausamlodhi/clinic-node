import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  createToken(payload) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '1h',
    });
  },
  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret, {
      expiresIn: config.jwtExpireIn,
    });
  }
};
