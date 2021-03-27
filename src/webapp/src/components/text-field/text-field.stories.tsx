import { Story, Meta } from "@storybook/react/types-6-0";

import TextField, { TextFieldProps } from "./text-field";

export default {
  title: "Distancely/TextField",
  component: TextField,
  argTypes: {
    buttonText: { control: "text" },
  },
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholderText: "Placeholder",
};

export const WithButton = Template.bind({});
WithButton.args = {
  placeholderText: "Placeholder",
  buttonText: "+",
};
