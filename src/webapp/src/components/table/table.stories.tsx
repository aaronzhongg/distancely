import { Story, Meta } from "@storybook/react/types-6-0";

import Table, { ColumnDefinitionType, TableProps } from "./table";

export default {
  title: "Distancely/Table",
  component: Table,
  argTypes: {},
} as Meta;

interface Cat {
  name: string;
  age: number;
  gender: string;
  color: string;
  activityLevel?: string; // optional, same as string | undefined
  favoriteFood?: string; // optional, same as string | undefined
}

const Template: Story<TableProps<Cat, keyof Cat>> = (args) => (
  <Table {...args} />
);

const columns: ColumnDefinitionType<Cat, keyof Cat>[] = [
  {
    key: "name",
    header: "Name",
    width: 150,
  },
  {
    key: "age",
    header: "Age in years",
  },
  {
    key: "color",
    header: "Color",
  },
];

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: [
    {
      name: "Mittens",
      color: "black",
      age: 2,
      gender: "female",
      activityLevel: "hight",
      favoriteFood: "milk",
    },
    {
      name: "Mons",
      color: "grey",
      age: 2,
      gender: "male",
      favoriteFood: "old socks",
      activityLevel: "medium",
    },
    {
      name: "Luna",
      color: "black",
      age: 2,
      gender: "female",
      activityLevel: "medium",
      favoriteFood: "fish",
    },
    {
      name: "Bella",
      color: "grey",
      age: 1,
      gender: "female",
      activityLevel: "high",
      favoriteFood: "mice",
    },
    {
      name: "Oliver",
      color: "orange",
      age: 1,
      gender: "male",
      activityLevel: "low",
      favoriteFood: "fish",
    },
  ],
};
