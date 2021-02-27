import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";

// components
import TextField from "./components/text-field";

// services
import GetDistanceTo from "./services/distance";

const AppWrapper = styled.div`
  display: flex;
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

const Label = styled.label``;

const ButtonClickHandler = () => {};

function App() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [travelTime, setTravelTime] = useState("");

  // React.useEffect(() => console.log(fromAddress), [fromAddress]);

  // React.useEffect(() => console.log(travelTime), [travelTime]);

  return (
    <AppWrapper>
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
        <Button
          onClick={async () => {
            var response = await GetDistanceTo(fromAddress, toAddress);
            setTravelTime(response.travelTime);
          }}
        >
          Get Distance To
        </Button>
      </DirectionsFormWrapper>
      <Label>{travelTime}</Label>
    </AppWrapper>
  );
}

export default App;
