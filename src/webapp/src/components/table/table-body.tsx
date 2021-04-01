import styled from "styled-components";
import { ColumnDefinitionType } from "./table";

const TableBody = styled.tbody``;

const Row = styled.tr``;

const Cell = styled.td``;

export type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const style = {
  // border: "1px solid black",
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <Row key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <Cell key={`cell-${index2}`} style={style}>
              {row[column.key]}
            </Cell>
          );
        })}
      </Row>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default TableRows;
