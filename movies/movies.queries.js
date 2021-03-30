import client from '../client';

export default {
  Query: {
    movies: () => {
      return client.movie.findMany();
    },

    movie: (_, { id }) => {
      return client.movie.findUnique({ where: { id } });
    }
  }
};