import { useState } from "react";
import styled from "styled-components";
import { Tag, Space, Row, Col, Button, Popover, AutoComplete } from "antd";
import "antd/dist/antd.css";
import PlacesAutocomplete2 from "../../components/places-autocomplete-2";

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

const Main2 = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag: string) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Test) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" },
  ];

  const [showPopover, setShowPopover] = useState(false);

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
      {/* Manually creating styled components */}
      {/* <Matrix>
        <ColumnHeader></ColumnHeader>
        <RowHeader></RowHeader>
      </Matrix> */}

      {/* Ant Table */}
      {/* <Table columns={columns} dataSource={data} /> */}
      <MatrixWrapper>
        <RowHeader>
          <AntRow align="middle">
            <AntCol flex={LeftSectionWidth}>start</AntCol>
            {renderStartAddresses()}
            <AntCol flex={LeftSectionWidth}>
              {/* <Button>add start address</Button> */}
              <Popover
                content={
                  // <AutoComplete
                  //   style={{ width: 200 }}
                  //   options={options}
                  //   // placeholder="try to type `b`"
                  //   filterOption={(inputValue, option) =>
                  //     option!.value
                  //       .toUpperCase()
                  //       .indexOf(inputValue.toUpperCase()) !== -1
                  //   }
                  // />
                  <PlacesAutocomplete2 />
                }
                // title="Title"
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
