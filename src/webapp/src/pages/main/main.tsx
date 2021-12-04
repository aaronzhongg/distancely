import { createRef, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Tag,
  Space,
  Row,
  Col,
  Button,
  Popover,
  AutoComplete,
  Divider,
} from "antd";
import "antd/dist/antd.css";
import PlacesAutocomplete2 from "../../components/places-autocomplete";
import PlacePopover from "../../components/place-popover";
import axios from "axios";
import { Place } from "../../types/place";
import React from "react";
import { RefSelectProps } from "antd/lib/select";
import { Distance } from "../../types/distance";
import { constants } from "fs";
import GetDistanceTo from "../../services/distance";

const LeftSectionWidth = "150px";

const RowHeader = styled.div`
  background-color: #227c9d;
  height: 5vh;
  min-height: 50px;
`;

const AntRow = styled(Row)`
  height: inherit;
  min-height: inherit;
`;

const AntCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;

const StartLabel = styled(AntCol)`
  align-items: center;
  min-height: inherit;
  height: inherit;
  font-weight: bold;
  font-size: 14px;
`;

const StartAddresses = styled(AntCol)`
  font-size: 14px;
  flex-grow: 10;
  flex-direction: row;
  min-height: inherit;
  height: inherit;
`;

const VerticalDivider = styled(Divider)`
  min-height: inherit;
  height: inherit;
`;

const ColumnHeader = styled(AntCol)`
  flex: 0 0 ${LeftSectionWidth};
  background-color: #ffcb77;
  /* height: 90vh; */
`;

const DestinationLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DestinationLabel = styled(AntCol)`
  font-weight: bold;
  font-size: 14px;
  height: 25px;
`;

const DestinationAddresses = styled(AntCol)`
  flex-grow: 10;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* min-height: 900px;
  min-width: 1440px; */
`;

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  flex-basis: 50%;
`;

const MapWrapper = styled.div`
  display: flex;
  /* flex-grow: 1; */
  flex-basis: 50%;
`;

const RenameThisOneDay = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const MatrixBody = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 90vh;
  flex-basis: 50%;
`;

const MatrixBodyHeader = styled(Row)`
  height: 50px;
  background-color: #17c3b2;
`;

const MatrixRows = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const MatrixRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

type Country = {
  country: string;
  countryCode: string;
};

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

// todo: update this?
type DistanceDisplay = {
  start: Place | null;
  destination: Place | null;
  travelTimeSeconds: number;
  distanceMeters: number;
  isLoading: boolean;
};

async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const Main2 = () => {
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  // Start
  const [showStartAddressPopover, setStartAddressShowPopover] = useState(false);
  const [startAddresses, setStartAddresses] = useState<Place[]>([]);

  // Destination
  const [
    showDestinationAddressPopover,
    setDestinationAddressShowPopover,
  ] = useState(false);
  const [destinationAddresses, setDestinationAddresses] = useState<Place[]>([]);

  // Distance
  const hasStartAddressAdded = useRef(false);
  const hasDestinationAddressAdded = useRef(false);
  const [distances, setDistances] = useState<DistanceDisplay[][]>([]); // [start.len][dest.length]

  useEffect(() => {
    const fetchUserCountry = async () => {
      setUserCountry(await GetUserCountry());
    };
    fetchUserCountry();
  }, []);

  const handleAddStartAddressVisibleChange = (visible: boolean) => {
    setStartAddressShowPopover(visible);
  };

  const addStartAddress = (selectedPlace: Place) => {
    setStartAddresses(startAddresses.concat(selectedPlace));
    setStartAddressShowPopover(false);

    var newStartTemplate = {
      start: selectedPlace,
      destination: null,
      travelTimeSeconds: 0,
      distanceMeters: 0,
      isLoading: true,
    } as DistanceDisplay;

    if (distances.length == 0) {
      setDistances([[newStartTemplate]]);
    } else {
      setDistances(
        distances.map((d) => {
          var newStart = { ...newStartTemplate } as DistanceDisplay;
          newStart.destination = d[0].destination;

          if (!hasStartAddressAdded.current) {
            return [newStart];
          }

          // newDistance.destination = d[0].destination;
          return d.concat(newStart);
        })
      );
    }

    hasStartAddressAdded.current = true;
  };

  const handleAddDestinationAddressVisibleChange = (visible: boolean) => {
    setDestinationAddressShowPopover(visible);
  };

  const addDestinationAddress = (selectedPlace: Place) => {
    console.log("addDestinationAddress");
    setDestinationAddresses(destinationAddresses.concat(selectedPlace));
    setDestinationAddressShowPopover(false);

    const newDestinationTemplate = {
      start: null,
      destination: selectedPlace,
      travelTimeSeconds: 0,
      distanceMeters: 0,
      isLoading: true,
    } as DistanceDisplay;

    if (!hasStartAddressAdded.current && distances.length == 0) {
      setDistances([[newDestinationTemplate]]);
    } else if (
      hasStartAddressAdded.current &&
      !hasDestinationAddressAdded.current &&
      distances.length == 1
    ) {
      setDistances([
        distances[0].map((d) => {
          var newDestination = { ...newDestinationTemplate } as DistanceDisplay;
          newDestination.start = d.start;
          return newDestination;
        }),
      ]);
    } else {
      setDistances([
        ...distances,
        distances[0].map((d) => {
          var newDestination = { ...newDestinationTemplate } as DistanceDisplay;
          newDestination.start = d.start;
          return newDestination;
        }),
      ]);
    }

    hasDestinationAddressAdded.current = true;
  };

  useEffect(() => {
    const getDistances = async () => {
      var tempDistances = [...distances];
      var hasUpdate = false;
      await asyncForEach(tempDistances, async (rows: DistanceDisplay[]) => {
        await asyncForEach(rows, async (distance: DistanceDisplay) => {
          console.log(distance);

          var tempDistance = [];

          if (!distance.isLoading || !distance.start || !distance.destination)
            return;

          var response = await GetDistanceTo(
            `${distance.start.mainText} ${distance.start.secondaryText}`,
            `${distance.destination.mainText} ${distance.destination.secondaryText}`
          );

          console.log(response);

          distance.travelTimeSeconds = response.travelTimeSeconds;
          distance.distanceMeters = response.distanceMeters;
          distance.isLoading = false;

          hasUpdate = true;
        });
      });

      console.log(tempDistances);
      if (hasUpdate) setDistances(tempDistances);
    };

    getDistances();
  }, [distances]);

  const shouldHaveDivider = (length: number, index: number) =>
    length > 0 && length != index + 1;

  const renderStartAddresses = () => {
    return startAddresses.map((address, index) => {
      return (
        <>
          <PlacePopover place={address} />
          {shouldHaveDivider(startAddresses.length, index) && (
            <VerticalDivider type="vertical" />
          )}
        </>
      );
    });
  };

  const renderDestinationAddresses = () => {
    return destinationAddresses.map((address, index) => {
      return (
        <>
          <PlacePopover place={address} />
          {shouldHaveDivider(destinationAddresses.length, index) && <Divider />}
        </>
      );
    });
  };

  const renderMatrixRows = () => {
    console.log("renderMatrixRows");
    // console.log(distances);

    return distances.map((rows) => (
      <MatrixRow>
        {rows.map((sa) => (
          <AntCol flex="auto">
            {sa.isLoading ? "loading" : sa.travelTimeSeconds}
          </AntCol> // todo: convert travel time into readable format i.e. 1hr 2min, 48min etc.
        ))}
      </MatrixRow>
    ));
  };

  return (
    <MainWrapper>
      <MatrixWrapper>
        <RowHeader>
          <AntRow align="middle">
            <StartLabel flex={LeftSectionWidth}>start ➡</StartLabel>
            <StartAddresses>{renderStartAddresses()}</StartAddresses>
            {/* TODO: Float "add start address" button to right */}
            <AntCol flex={LeftSectionWidth}>
              <Popover
                content={
                  <PlacesAutocomplete2
                    country={userCountry?.countryCode}
                    onSelectSuggestion={addStartAddress}
                    clearOnSelection={true}
                  />
                }
                trigger="click"
                visible={showStartAddressPopover}
                onVisibleChange={handleAddStartAddressVisibleChange}
                destroyTooltipOnHide={true}
              >
                <Button type="primary">add start</Button>
              </Popover>
            </AntCol>
          </AntRow>
        </RowHeader>
        <RenameThisOneDay>
          <ColumnHeader>
            <DestinationLabelWrapper>
              <DestinationLabel>destinations</DestinationLabel>
              <DestinationLabel>⬇</DestinationLabel>
            </DestinationLabelWrapper>
            <DestinationAddresses>
              {renderDestinationAddresses()}
            </DestinationAddresses>
            <Row>
              <Popover
                content={
                  <PlacesAutocomplete2
                    country={userCountry?.countryCode}
                    onSelectSuggestion={addDestinationAddress}
                    clearOnSelection={true}
                  />
                }
                trigger="click"
                visible={showDestinationAddressPopover}
                onVisibleChange={handleAddDestinationAddressVisibleChange}
                destroyTooltipOnHide={true}
              >
                <Button type="primary">add destination</Button>
              </Popover>
            </Row>
          </ColumnHeader>
          <MatrixBody>
            <MatrixBodyHeader>Average</MatrixBodyHeader>
            <MatrixRows>{renderMatrixRows()}</MatrixRows>
          </MatrixBody>
        </RenameThisOneDay>
      </MatrixWrapper>
      <MapWrapper></MapWrapper>
    </MainWrapper>
  );
};

export default Main2;
