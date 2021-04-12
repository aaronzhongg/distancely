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
import Table, { ColumnDefinitionType } from "../../components/table/table";
import { Distance } from "../../types/distance";

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

const distanceColumns: ColumnDefinitionType<Distance, keyof Distance>[] = [
  {
    key: "destination",
    header: "Name",
    width: 150,
  },
  {
    key: "travelTime",
    header: "Travel Time",
  },
  {
    key: "distance",
    header: "Distance",
  },
];

const Main = () => {
  const fromAddressRef = useRef("");
  const [toAddress, setToAddress] = useState("");
  const userCountryRef = useRef("");
  var [destinations, setDestinations] = useState<Distance[]>([]);

  //   const [getDistance, { loading, /*error,*/ data }] = useLazyQuery(
  //   GET_DISTANCE
  // );

  React.useEffect(() => {
    const fetchUserCountry = async () => {
      var userCountry = await GetUserCountry();
      userCountryRef.current = userCountry;
    };
    fetchUserCountry();
  }, []);

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
            <TextField
              value={toAddress}
              onChangeHandler={(event) => {
                setToAddress(event.target.value);
              }}
              placeholderText={"To"}
              onButtonClickHandler={() => {
                destinations = destinations.concat({
                  destination: toAddress,
                  travelTime: undefined,
                  distance: undefined,
                });
                setDestinations(destinations);
                setToAddress("");
              }}
              buttonText={"+"}
            />
          </DirectionsFormWrapper>
          <Table columns={distanceColumns} data={destinations} />
          <Button
            onClickHandler={() => {
              // todo: update server to take a list of destinations, and get travel time and distance for all
            }}
          >
            Get Distances
          </Button>
        </LeftSectionWrapper>
      </BodyWrapper>
    </AppWrapper>
  );
};

export default Main;
