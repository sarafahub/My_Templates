import 'dotenv/config';
import 'cross-fetch/polyfill'
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN_ACCESS}`
      }
    });
  }
});

const GET_ORG_DETAILS = gql`
  query {
    organization(login: "qutbITech") {
      name
      url
      description
    }
    viewer{
      name
      id
      url
      
    }
  }
`;

client.query({
  query: GET_ORG_DETAILS
}).then(res => console.log('GET_ORG_DETAILS >>>', res));




// Query with Variables

const GET_ORG_DETAILS_VARIABLE = gql`
  query getOrganization($org: String!){
    organization(login: $org) {
      name
      url
      description
    }
  }
`;

client.query({
  query: GET_ORG_DETAILS_VARIABLE,
  variables: {
    org: "qutbITech"
  }
}).then(res => console.log('GET_ORG_DETAILS_VARIABLE >>>', res));




// MUTATION

const ADD_STAR = gql`
  mutation ($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`

client.mutate({
  mutation: ADD_STAR,
  variables: {
    repoId: "MDEwOlJlcG9zaXRvcnkzODc1MTIzNjA="
  }
})
.then(d => console.log(JSON.stringify(d)))
.catch(err => console.log('Err: ', err));