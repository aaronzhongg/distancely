import styled from "styled-components";
import TableRows from "./table-body";
import TableHeader from "./table-header";

const TableWrapper = styled.table`
  border: 1px solid #c4c4c4;
  border-radius: 12px;
  padding: 12px;
`;

const NoDataText = styled.td`
  color: #696969;
  text-align: center;
  padding: 10px 0px;
`;

const Tr = styled.tr`
  column-span: all;
`;

const TableBody = styled.tbody``;

// todo: replace with react-table when v8 with ts support is released (sometime in 2021?)
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
  format?: (value: T[K]) => any;
};

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  noDataText?: string;
};

const style = {
  // borderCollapse: "collapse",
} as const;

const Table = <T, K extends keyof T>({
  data,
  columns,
  noDataText,
}: TableProps<T, K>): JSX.Element => {
  return (
    <TableWrapper style={style}>
      <TableHeader columns={columns} />
      {data.length > 0 ? (
        <TableRows data={data} columns={columns} />
      ) : (
        <NoDataText colSpan={42}>{noDataText}</NoDataText>
      )}
    </TableWrapper>
  );
};

export default Table;
