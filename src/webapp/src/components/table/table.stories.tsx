import { Story, Meta } from "@storybook/react/types-6-0";

import Table, { ColumnDefinitionType, TableProps } from "./table";

export default {
  title: "Distancely/Table",
  component: Table,
  argTypes: {},
} as Meta;

// todo: put type in a shared models dir
type Distance = {
  destination: string;
  travelTime: number;
  distance: number;
};

const DistanceTemplate: Story<TableProps<Distance, keyof Distance>> = (
  args
) => <Table {...args} />;

const distanceColumns: ColumnDefinitionType<Distance, keyof Distance>[] = [
  {
    key: "destination",
    header: "Name",
    width: 150,
  },
  {
    key: "travelTime",
    header: "Travel Time",
  },
  {
    key: "distance",
    header: "Distance",
  },
];

export const Default = DistanceTemplate.bind({});
Default.args = {
  columns: distanceColumns,
  data: [
    {
      destination: "106 Glenmore Road",
      travelTime: 100,
      distance: 12000,
    },
    {
      destination: "1 Nelson Street",
      travelTime: 120,
      distance: 18200,
    },
  ],
};

type Cat = {
  name: string;
  age: number;
  gender: string;
  color: string;
  activityLevel?: string; // optional, same as string | undefined
  favoriteFood?: string; // optional, same as string | undefined
};

const CatTemplate: Story<TableProps<Cat, keyof Cat>> = (args) => (
  <Table {...args} />
);

const catColumns: ColumnDefinitionType<Cat, keyof Cat>[] = [
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

export const CatExample = CatTemplate.bind({});
CatExample.args = {
  columns: catColumns,
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
