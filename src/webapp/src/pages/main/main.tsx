import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../breakpoints";

// components
import TextField from "../../components/text-field";
import Button from "../../components/button";

// services
import GetDistanceTo from "../../services/distance";

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
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 700;
`;

const BodyWrapper = styled.div`
  flex: 9;
  display: flex;
  @media ${device.sm} {
    flex-direction: column;
  }
`;

const LeftSectionWrapper = styled.div`
  display: flex;
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
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

// todo: move to helper file
const FormatTime = (timeInSeconds: number) => {
  if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} seconds`;

  if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} minutes`;

  return `${Math.round(timeInSeconds / 60 / 60)} hours`;
};

const FormatDistance = (distanceInMeters: number) => {
  if (distanceInMeters < 100) return `${Math.round(distanceInMeters)} meters`;

  return `${Math.round((distanceInMeters / 1000) * 10) / 10}km`;
};

const Main = () => {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [distance, setDistance] = useState("");

  // React.useEffect(() => console.log(fromAddress), [fromAddress]);
  const ButtonClickHandler = async () => {
    var response = await GetDistanceTo(fromAddress, toAddress);
    setTravelTime(response.travelTime);
    setDistance(response.distanceMeters);
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
                setFromAddress(event.target.value);
              }}
              onKeyPressHandler={(event) => {
                if (event.key === "Enter") ButtonClickHandler();
              }}
            />
            <TextField
              onChangeHandler={(event) => {
                setToAddress(event.target.value);
              }}
              onKeyPressHandler={(event) => {
                if (event.key === "Enter") ButtonClickHandler();
              }}
            />
            <Button
              onClickHandler={(event) => {
                ButtonClickHandler();
              }}
            >
              Get Distance To
            </Button>
          </DirectionsFormWrapper>
        </LeftSectionWrapper>
        <RightSectionWrapper>
          <Label>Travel Time: {FormatTime(parseInt(travelTime))}</Label>
          <Label>Distance: {FormatDistance(parseInt(distance))}</Label>
        </RightSectionWrapper>
      </BodyWrapper>
    </AppWrapper>
  );
};

export default Main;
