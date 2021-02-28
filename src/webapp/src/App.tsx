import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";

// components
import TextField from "./components/text-field";
import Button from "./components/button";

// services
import GetDistanceTo from "./services/distance";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  align-items: stretch;
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

function App() {
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
      <LeftSectionWrapper>
        <DirectionsFormWrapper>
          <TextField
            onChangeHandler={(event) => {
              setFromAddress(event.target.value);
            }}
          />
          <TextField
            onChangeHandler={(event) => {
              setToAddress(event.target.value);
            }}
          />
          <Button onClickHandler={(event) => ButtonClickHandler()}>
            Get Distance To
          </Button>
        </DirectionsFormWrapper>
      </LeftSectionWrapper>
      <RightSectionWrapper>
        <Label>Travel Time: {travelTime}</Label>
        <Label>Distance: {distance}</Label>
      </RightSectionWrapper>
    </AppWrapper>
  );
}

export default App;
