import { Story, Meta } from "@storybook/react/types-6-0";

import Button, { ButtonProps } from "./button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const DistancelyButton = Template.bind({});
DistancelyButton.args = {
  children: "Button",
};
