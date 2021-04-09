import jwt from 'jsonwebtoken';
import client from '../client';
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    console.log(
      '\x1b[33m%s\x1b[0m',
      'jwt.verify() user=' + JSON.stringify(user)
    );
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
/*
export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action'
    };
  }
  return ourResolver(root, args, context, info);
};
*/
export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action'
      };
    }
  };
}
