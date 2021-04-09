import client from '../../client';

export default {
  Query: {
    // 브라우저(클라이언트)가 호출 한다. 내부에서 호출 하지 않는다
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username
        }
      })
  }
};
