// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export const graphqlClient = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('http://localhost:4000/graphql/');
