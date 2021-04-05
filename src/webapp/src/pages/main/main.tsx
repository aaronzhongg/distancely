import React, { useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../breakpoints";
import { useLazyQuery } from "@apollo/client";

// components
import TextField from "../../components/text-field";
import Button from "../../components/button";

// services
import { GET_DISTANCE } from "../../graphql/queries";
import axios from "axios";

// import GetUserCountry from "../../services/user-location";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  align-items: stretch;
  flex-direction: column;
`;

// todo: media query
const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  align-items: center;
  justify-content: center;

  @media ${device.min_sm} {
    position: fixed;
  }
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
`;

const BodyWrapper = styled.div`
  flex: 9;
  display: flex;
  @media ${device.max_sm} {
    flex-direction: column;
  }
`;

const LeftSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // background: blue;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RightSectionWrapper = styled.div`
  display: flex;
  // background: red;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > * {
    margin: 20px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardText = styled.div`
  font-size: 48px;
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 5px 15px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  & > * {
    flex-grow: 1;
  }
`;

const Table = styled.table``;

const Header = styled.thead``;

const HeaderRow = styled.tr``;

const HeaderColumn = styled.th``;

const Body = styled.tbody``;

const RowWrapper = styled.tr``;

const Cell = styled.td``;

// todo: move to helper file
const FormatTime = (timeInSeconds: number) => {
  if (!timeInSeconds) return;

  if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} seconds`;

  if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} minutes`;

  return `${Math.round(timeInSeconds / 60 / 60)} hours`;
};

const FormatDistance = (distanceInMeters: number) => {
  if (!distanceInMeters) return;

  if (distanceInMeters < 100) return `${Math.round(distanceInMeters)} meters`;

  return `${Math.round((distanceInMeters / 1000) * 10) / 10}km`;
};

// todo: move to shared file
async function GetUserCountry(): Promise<string> {
  var result = await axios("https://extreme-ip-lookup.com/json/");

  if (result.status === 200) return result.data.country;

  console.log("Cannot retrieve country");
  return "";
}

const Main = () => {
  const fromAddressRef = useRef("");
  const userCountryRef = useRef("");

  React.useEffect(() => {
    const fetchUserCountry = async () => {
      var userCountry = await GetUserCountry();
      userCountryRef.current = userCountry;
    };
    fetchUserCountry();
  }, []);

  const Row = () => {
    const destinationRef = useRef("");
    // const [destination, setDestination] = useState("");
    const [getDistance, { loading, /*error,*/ data }] = useLazyQuery(
      GET_DISTANCE
    );

    const onSubmitHandler = () => {
      var fromAddressPlusCountry = `${fromAddressRef.current}, ${userCountryRef.current}`;
      var toAddressPlusCountry = `${destinationRef.current}, ${userCountryRef.current}`;
      console.log(fromAddressPlusCountry);
      getDistance({
        variables: {
          fromAddress: fromAddressPlusCountry,
          toAddress: toAddressPlusCountry,
        },
      });
    };

    return (
      <RowWrapper>
        <Cell>
          <TextField
            onChangeHandler={(event) => {
              destinationRef.current = event.target.value;
            }}
            onKeyPressHandler={(event) => {
              if (event.key === "Enter") {
                onSubmitHandler();
                // todo: clear to addy
              }
            }}
            placeholderText={"To"}
            buttonText={"+"}
            onButtonClickHandler={() => {
              onSubmitHandler();
              // setDestinationAddresses(
              //   destinationAddresses.concat({
              //     destination: toAddress,
              //     travelTime: 100,
              //     distance: 100,
              //   })
              // );
            }}
          />
        </Cell>
        <Cell>
          {loading && "loading"}
          {data && FormatTime(parseInt(data.distance.travelTime))}
          {!loading && !data && "?"}
        </Cell>
        <Cell>
          {" "}
          {loading && "loading"}
          {data && FormatDistance(parseInt(data.distance.distanceMeters))}
          {!loading && !data && "?"}
        </Cell>
      </RowWrapper>
    );
  };

  return (
    <AppWrapper>
      <HeadingWrapper>
        <Title>distancely</Title>
      </HeadingWrapper>
      <BodyWrapper>
        <LeftSectionWrapper>
          <DirectionsFormWrapper>
            <TextField
              onChangeHandler={(event) => {
                fromAddressRef.current = event.target.value;
              }}
              placeholderText={"From"}
            />
          </DirectionsFormWrapper>
          {/* <DestinationMatrix></DestinationMatrix> */}
          <Table>
            <Header>
              <HeaderRow>
                <HeaderColumn>Destination</HeaderColumn>
                <HeaderColumn>Travel Time</HeaderColumn>
                <HeaderColumn>Distance</HeaderColumn>
              </HeaderRow>
            </Header>
            <Body>
              <Row />
              <Row />
            </Body>
          </Table>
        </LeftSectionWrapper>
      </BodyWrapper>
    </AppWrapper>
  );
};

export default Main;
