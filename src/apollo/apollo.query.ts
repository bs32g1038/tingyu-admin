import { gql } from 'apollo-boost';
import apolloClient from './apollo.client';

export default queryList = (query, variables = {}) => {
    apolloClient.query({
        variables,
        query,
    });
};
