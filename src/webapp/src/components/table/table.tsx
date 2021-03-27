import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table``;

const HeaderRow = styled.tr``;

const HeaderColumn = styled.th``;

const Row = styled.tr``;

const Column = styled.td``;

export interface TableProps {
  headers?: string[];
  rowData?: any[][];
}

const Table = ({ headers, rowData }: TableProps) => {
  return (
    <TableWrapper>
      <HeaderRow>
        {headers?.map((h) => (
          <HeaderColumn>{h}</HeaderColumn>
        ))}
      </HeaderRow>
      {rowData?.map((row) => (
        <Row>
          {row.map((r) => (
            <Column>{r}</Column>
          ))}
        </Row>
      ))}
    </TableWrapper>
  );
};

export default Table;
