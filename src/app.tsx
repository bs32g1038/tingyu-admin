import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from '@/apollo/apollo.client';

export function rootContainer(container: any) {
    return React.createElement(ApolloProvider, { client: ApolloClient }, container);
}
