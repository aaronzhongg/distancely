import styled from "styled-components";
import { ColumnDefinitionType } from "./table";

const Header = styled.thead``;

const Row = styled.tr``;

const HeaderColumn = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 500;
  text-align: left;
  // background-color: #4caf50;
  // color: white;
`;

export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? 100, // 100 is our default value if width is not defined
      // borderBottom: "2px solid black",
    };

    return (
      <HeaderColumn key={`headCell-${index}`} style={style}>
        {column.header}
      </HeaderColumn>
    );
  });

  return (
    <Header>
      <Row>{headers}</Row>
    </Header>
  );
};

export default TableHeader;
