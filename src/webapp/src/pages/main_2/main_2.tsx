import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Space, Row, Col } from "antd";
import "antd/dist/antd.css";

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

const ColumnHeader = styled.div``;

const MatrixBody = styled.div`
  width: 100%;
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
        <RowHeader>row header</RowHeader>
        <RenameThisOneDay>
          <ColumnHeader>column header</ColumnHeader>
          <MatrixBody>
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
