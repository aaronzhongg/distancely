import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import TextField from "./components/text-field";
// axios
//   .get(
//     "https://localhost:2442/DistanceCalculator?fromAddress=96%20holly%20street%2C%20avondale&toAddress=1%20Nelson%20Street%2C%20Auckland"
//   )
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const AppWrapper = styled.div`
  display: flex;
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <AppWrapper>
      <DirectionsFormWrapper>
        <TextField />
        <TextField />
        <Button> Find Distance To </Button>
      </DirectionsFormWrapper>
    </AppWrapper>
  );
}

export default App;
