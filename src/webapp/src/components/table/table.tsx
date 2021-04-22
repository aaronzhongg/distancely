import styled from "styled-components";
import TableRows from "./table-body";
import TableHeader from "./table-header";

const TableWrapper = styled.table``;

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
};

const style = {
  // borderCollapse: "collapse",
} as const;

const Table = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <TableWrapper style={style}>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </TableWrapper>
  );
};

export default Table;
