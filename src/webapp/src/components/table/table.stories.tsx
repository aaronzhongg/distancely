import { Story, Meta } from "@storybook/react/types-6-0";

import Table, { TableProps } from "./table";

export default {
  title: "Distancely/Table",
  component: Table,
  argTypes: {},
} as Meta;

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  headers: ["header 1", "header 2", "header 3"],
  rowData: [
    ["row 1", "row 1", "row 1"],
    ["row 2", "row 2", "row 2"],
  ],
};
