import axios from "axios";

export default async function GetDistanceTo(
  fromAddress: string,
  destinationAddress: string
) {
  // todo: move to another class
  console.log("GetDistanceTo");
  var response = await axios.get(
    `https://localhost:2442/DistanceCalculator?fromAddress=${encodeURIComponent(
      fromAddress
    )}&destinationAddress=${encodeURIComponent(destinationAddress)}`
  );
  console.log(response);

  // todo: what happens when non 200?
  if (response.status === 200) return response.data;

  // .then((response) => {
  //   console.log(response);
  //   return response.data; // todo: Make response model?
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
}
