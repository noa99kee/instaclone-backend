import client from '../client';
import bcrypt from 'bcrypt';
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }]
          }
        });
        if (existingUser) {
          throw new Error('This username/password is already taken.');
        }

        // has password
        const uglyPassword = await bcrypt.hash(password, 10); // security
        console.log(uglyPassword);
        // save and return the user
        const user = client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword
          }
        });
        return user;
      } catch (e) {
        return e;
      }
    }
  }
};
