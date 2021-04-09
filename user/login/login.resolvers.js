import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default {
  Mutation: {
    login: async (_, { username, password }) => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'login() username:' + username + 'password:' + password
      );
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        console.log('\x1b[33m%s\x1b[0m', 'User not found');
        return {
          ok: false,
          error: 'User not found.'
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        console.log('\x1b[33m%s\x1b[0m', 'Incorrect password');
        return {
          ok: false,
          error: 'Incorrect password.'
        };
      }
      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      console.log('\x1b[33m%s\x1b[0m', 'success !!');
      console.log('\x1b[33m%s\x1b[0m', 'jwt.sign() token=' + token);
      return {
        ok: true,
        token
      };
    }
  }
};
