import gql from "graphql-tag";

export const GET_DISTANCES = gql`
  query Destinations($fromAddress: String!, $destinationAddresses: [String!]) {
    destinations(
      fromAddress: $fromAddress
      destinationAddresses: $destinationAddresses
    ) {
      place {
        address
      }
      distanceMeters
      travelTime
    }
  }
`;
