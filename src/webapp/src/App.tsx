import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import TextField from "./components/text-field";

const AppWrapper = styled.div`
  display: flex;
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

const GetDistanceTo = (fromAddress: string, toAddress: string) => {
  // todo: move to another class
  console.log("GetDistanceTo");
  axios
    .get(
      `https://localhost:2442/DistanceCalculator?fromAddress=${encodeURIComponent(
        fromAddress
      )}&toAddress=${encodeURIComponent(toAddress)}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  // React.useEffect(() => console.log(fromAddress), [fromAddress]);

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
        <Button onClick={() => GetDistanceTo(fromAddress, toAddress)}>
          Get Distance To
        </Button>
      </DirectionsFormWrapper>
    </AppWrapper>
  );
}

export default App;
