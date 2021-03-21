import axios from "axios";

export default async function GetUserCountry(): Promise<string> {
  var result = await axios("https://extreme-ip-lookup.com/json/");
  console.log(result);

  if (result.status === 200) return result.data.country;

  console.log("Cannot retrieve country");
  return "";
}
