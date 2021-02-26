import axios from "axios";

export default function GetDistanceTo(fromAddress: string, toAddress: string) {
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
}
