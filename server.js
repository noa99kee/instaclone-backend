import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './user/users.utils';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // console.log(req.headers); // req.headers.token 클라이언트가 보내준 토큰
    return {
      loggedInUser: await getUser(req.headers.token)
    };
  }
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/ 🌈`)
  );
