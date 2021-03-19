import gql from "graphql-tag";

export const GET_DISTANCE = gql`
  query Distance($fromAddress: String!, $toAddress: String!) {
    distance(fromAddress: $fromAddress, toAddress: $toAddress) {
      distanceMeters
      travelTime
    }
  }
`;
