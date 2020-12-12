import apolloServer from 'gql';

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({path: '/api/graphql'});
