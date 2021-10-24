import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Tag, Space, Row, Col, Button, Popover, AutoComplete } from "antd";
import "antd/dist/antd.css";
import PlacesAutocomplete2 from "../../components/places-autocomplete-2";
import axios from "axios";

const LeftSectionWidth = "120px";

const AntRow = styled(Row)`
  height: 40px;
`;

const AntCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const MainWrapper = styled.div``;

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: aliceblue;
`;

const RowHeader = styled.div`
  background-color: green;
`;

const RenameThisOneDay = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: darkblue;
`;

const MatrixBody = styled.div`
  /* width: 100%; */
  display: flex;
  flex-grow: 1;
  background-color: darkcyan;
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
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const fetchUserCountry = async () => {
      setUserCountry(await GetUserCountry());
    };
    fetchUserCountry();
  }, []);

  const startAddresses = ["Address 1", "Address 2", "Address 3"];

  const handleVisibleChange = (visible: boolean) => {
    setShowPopover(visible);
  };

  const renderStartAddresses = () => {
    return startAddresses.map((address) => (
      <AntCol flex="auto">{address}</AntCol>
    ));
  };

  return (
    <MainWrapper>
      <MatrixWrapper>
        <RowHeader>
          <AntRow align="middle">
            <AntCol flex={LeftSectionWidth}>start</AntCol>
            {renderStartAddresses()}
            <AntCol flex={LeftSectionWidth}>
              <Popover
                content={
                  <PlacesAutocomplete2 country={userCountry?.countryCode} />
                }
                trigger="click"
                visible={showPopover}
                onVisibleChange={handleVisibleChange}
              >
                <Button type="primary">add start address</Button>
              </Popover>
            </AntCol>
          </AntRow>
        </RowHeader>
        <RenameThisOneDay>
          <MatrixBody>
            <AntCol flex={LeftSectionWidth}>Column header</AntCol>
            <Row>
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
            </Row>
          </MatrixBody>
        </RenameThisOneDay>
      </MatrixWrapper>
    </MainWrapper>
  );
};

export default Main2;
