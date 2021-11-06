import { Story, Meta } from "@storybook/react/types-6-0";

import PlacesAutocomplete from "./places-autocomplete-old";

export default {
  title: "Distancely/PlacesAutocomplete",
  component: PlacesAutocomplete,
  //   argTypes: {
  //     buttonText: { control: "text" },
  //   },
} as Meta;

const Template: Story = (args) => <PlacesAutocomplete {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholderText: "Placeholder",
};

export const WithButton = Template.bind({});
WithButton.args = {
  placeholderText: "Placeholder",
  buttonText: "+",
};
