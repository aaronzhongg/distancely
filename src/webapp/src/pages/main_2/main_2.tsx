import { createRef, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Tag, Space, Row, Col, Button, Popover, AutoComplete } from "antd";
import "antd/dist/antd.css";
import PlacesAutocomplete2 from "../../components/places-autocomplete-2";
import axios from "axios";
import { Place } from "../../types/place";
import React from "react";
import { RefSelectProps } from "antd/lib/select";

const LeftSectionWidth = "150px";

const RowHeader = styled.div`
  background-color: #227c9d;
  height: 10vh;
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
  flex-direction: column;
  align-items: center;
`;

const StartLabel = styled(AntCol)`
  align-items: center;
  min-height: inherit;
  font-weight: bold;
  font-size: x-large;
`;

const StartAddresses = styled(AntCol)`
  flex-grow: 10;
  flex-direction: row;
`;

const ColumnHeader = styled(AntCol)`
  flex: 0 0 ${LeftSectionWidth};
  background-color: #ffcb77;
  height: 90vh;
`;

const DestinationLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DestinationLabel = styled(AntCol)`
  font-weight: bold;
  font-size: x-large;
  height: 5vh;
`;

const DestinationAddresses = styled(AntCol)`
  flex-grow: 10;
`;

const MainWrapper = styled.div``;

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
`;

const MatrixBodyHeader = styled(Row)`
  height: 10vh;
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

type Test = {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
};

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
  const startAddressAutocompleteRef = useRef<any>(null);

  useEffect(() => {
    const fetchUserCountry = async () => {
      setUserCountry(await GetUserCountry());
    };
    fetchUserCountry();
  }, []);

  const handleAddStartAddressVisibleChange = (visible: boolean) => {
    setStartAddressShowPopover(visible);
  };

  const handleAddDestinationAddressVisibleChange = (visible: boolean) => {
    setDestinationAddressShowPopover(visible);
  };

  // TODO: Render main text, mouseover more details
  const renderStartAddresses = () => {
    return startAddresses.map((address) => (
      <AntCol flex="auto">{address.mainText}</AntCol>
    ));
  };

  const renderDestinationAddresses = () => {
    return destinationAddresses.map((address) => (
      <AntCol flex="auto">{address.mainText}</AntCol>
    ));
  };

  const renderMatrixRows = () => {
    return destinationAddresses.map((da) => {
      return (
        <MatrixRow>
          {startAddresses.map((sa) => {
            return (
              <AntCol flex="auto">
                {da.mainText} {sa.mainText}
              </AntCol>
            );
          })}
        </MatrixRow>
      );
    });
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
                    onSelectSuggestion={(selectedPlace) => {
                      setStartAddresses(startAddresses.concat(selectedPlace));
                      setStartAddressShowPopover(false);
                    }}
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
                    onSelectSuggestion={(selectedPlace) => {
                      setDestinationAddresses(
                        destinationAddresses.concat(selectedPlace)
                      );
                      setDestinationAddressShowPopover(false);
                    }}
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
            <MatrixRows>
              {/* <Row>
                <Col span={24}>col</Col>
              </Row>
              <Row>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
              </Row>
              <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
              </Row>
              <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
              </Row> */}
              {renderMatrixRows()}
            </MatrixRows>
          </MatrixBody>
        </RenameThisOneDay>
      </MatrixWrapper>
    </MainWrapper>
  );
};

export default Main2;
