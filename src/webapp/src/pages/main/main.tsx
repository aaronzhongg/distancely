import React, { useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../breakpoints";
import { useLazyQuery } from "@apollo/client";

// components
import spinner from "../../assets/spinner.gif";

// services
import { GET_DISTANCES } from "../../graphql/queries";
import axios from "axios";
import Table, { ColumnDefinitionType } from "../../components/table/table";
import { Distance } from "../../types/distance";
import PlacesAutocomplete from "../../components/places-autocomplete";

// import GetUserCountry from "../../services/user-location";

import mixpanel from "mixpanel-browser";

type DistanceType = {
  place: PlaceType;
  travelTime: number;
  distanceMeters: number;
};

type PlaceType = {
  address: string;
};

type Country = {
  country: string;
  countryCode: string;
};

const UNKNOWN = -1;

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

  // @media ${device.sm_and_larger} {
  //   position: fixed;
  // }
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  margin: 24px 0px;
`;

const BodyWrapper = styled.div`
  flex: 9;
  display: flex;
  @media ${device.sm_and_smaller} {
    flex-direction: column;
  }
`;

const LeftSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // background: blue;
  flex: 1;
  align-items: center;
  // justify-content: center;
`;

const DirectionsFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;

  & > * {
    margin: 10px 15px;
  }

  @media ${device.sm_and_larger} {
    width: 420px;
  }
`;

const TableWrapper = styled.div`
  margin: 20px;
`;

const Spinner = styled.img`
  height: 20px;
  width: 20px;
`;

// todo: move to helper file
const FormatTime = (timeInSeconds: number) => {
  if (!timeInSeconds) return <Spinner src={spinner} alt="loading..." />;
  if (timeInSeconds === UNKNOWN) return "?";

  if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} seconds`;

  if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} minutes`;

  return `${Math.round(timeInSeconds / 60 / 60)} hours`;
};

const FormatDistance = (distanceInMeters: number) => {
  if (!distanceInMeters) return <Spinner src={spinner} alt="loading..." />;
  if (distanceInMeters === UNKNOWN) return "?";

  if (distanceInMeters < 100) return `${Math.round(distanceInMeters)} meters`;

  return `${Math.round((distanceInMeters / 1000) * 10) / 10}km`;
};

// todo: move to shared file
async function GetUserCountry(): Promise<Country | null> {
  var result = await axios("https://extreme-ip-lookup.com/json/");

  if (result.status === 200)
    return {
      country: result.data.country,
      countryCode: result.data.countryCode,
    };

  console.log("Cannot retrieve country");
  return null;
}

const distanceColumns: ColumnDefinitionType<Distance, keyof Distance>[] = [
  {
    key: "destination",
    header: "Destinations",
    width: 250,
  },
  {
    key: "travelTime",
    header: "Travel Time",
    format: (value) => FormatTime(value as number),
  },
  {
    key: "distance",
    header: "Distance",
    format: (value) => FormatDistance(value as number),
  },
];

// todo: load destination travel times on add
const Main = () => {
  const fromAddressRef = useRef("");
  const [toAddress, setToAddress] = useState("");
  const userCountryRef = useRef<Country | null>(null);
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  var [destinations, setDestinations] = useState<Distance[]>([]);

  const [getDistances, { loading, /*error,*/ data }] = useLazyQuery(
    GET_DISTANCES,
    {
      onCompleted: (data) => {
        var resultDestinations = data.destinations as [DistanceType];
        destinations = destinations.map((dest) => {
          var destinationDistance = resultDestinations.find((d) => {
            return d && d.place.address.startsWith(dest.destination);
          }) as DistanceType;

          if (!destinationDistance) {
            dest.distance = UNKNOWN;
            dest.travelTime = UNKNOWN;
          } else {
            dest.distance = destinationDistance.distanceMeters;
            dest.travelTime = destinationDistance.travelTime;
          }

          return dest;
        });
        setDestinations(destinations);
      },
    }
  );

  React.useEffect(() => {
    mixpanel.track("Page Visit");
    const fetchUserCountry = async () => {
      setUserCountry(await GetUserCountry());
    };
    fetchUserCountry();
  }, []);

  const addDestinationAddressHandler = () => {
    if (!toAddress) return;

    mixpanel.track("Destination Added", { Address: toAddress });

    destinations = destinations.concat({
      destination: toAddress,
      travelTime: undefined,
      distance: undefined,
    });
    setDestinations(destinations);
    setToAddress("");

    updateDestinationTravelTimes();
  };

  const updateDestinationTravelTimes = () => {
    getDistances({
      variables: {
        fromAddress: `${fromAddressRef.current}, ${userCountry?.country}`,
        destinationAddresses: destinations.map(
          (d) => `${d.destination}, ${userCountry?.country}`
        ),
      },
    });
  };

  return (
    <AppWrapper>
      <HeadingWrapper>
        <Title>distancely</Title>
      </HeadingWrapper>
      <BodyWrapper>
        <LeftSectionWrapper>
          <DirectionsFormWrapper>
            <PlacesAutocomplete
              setValue={(val) => {
                fromAddressRef.current = val;
              }}
              country={userCountry?.countryCode}
              onChangeHandler={(event) => {
                fromAddressRef.current = event.target.value;
              }}
              onSelectHandler={updateDestinationTravelTimes}
              onKeyDownHandler={(event) => {
                if (event.key === "Enter") updateDestinationTravelTimes();
              }}
              placeholderText={"From address."}
              labelText={"Where are you coming from?"}
            />
            <PlacesAutocomplete
              setValue={setToAddress}
              country={userCountry?.countryCode}
              value={toAddress}
              onKeyDownHandler={(event) => {
                if (event.key === "Enter") addDestinationAddressHandler();
              }}
              onChangeHandler={(event) => {
                setToAddress(event.target.value);
              }}
              placeholderText={"Add a destination address."}
              labelText={"Where are you going?"}
              onButtonClickHandler={() => {
                addDestinationAddressHandler();
              }}
              buttonText={"+"}
              clearOnEnterKeyPress={true}
            />
          </DirectionsFormWrapper>
          <TableWrapper>
            <Table
              columns={distanceColumns}
              data={destinations}
              noDataText={"Add some addresses to get travel times 🚗💨"}
            />
          </TableWrapper>
        </LeftSectionWrapper>
      </BodyWrapper>
    </AppWrapper>
  );
};

export default Main;
