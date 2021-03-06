import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String # 필수!
      lastName: String
      username: String
      email: String
      password: String
    ): EditProfileResult!
  }
`;
