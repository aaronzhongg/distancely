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
