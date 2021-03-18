import gql from "graphql-tag";

export const GET_DISTANCE = gql`
  {
    distance {
      distanceMeters
      travelTime
    }
  }
`;
