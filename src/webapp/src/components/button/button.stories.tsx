import { Story, Meta } from "@storybook/react/types-6-0";

import Button, { ButtonProps } from "./button";

export default {
  title: "Distancely/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};
