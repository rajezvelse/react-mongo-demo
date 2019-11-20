import ApolloClient from 'apollo-boost';
import { API_URL } from '.';

// Creating Apollo client instance 
export const apolloClient = new ApolloClient({
    uri: API_URL
})