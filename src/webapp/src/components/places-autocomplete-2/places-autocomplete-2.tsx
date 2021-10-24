import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { AutoComplete, SelectProps } from "antd";
import styled from "styled-components";

const SuggestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionMain = styled.div`
  font-weight: 700;
`;

const SuggestionSecondary = styled.div`
  font-size: small;
`;
export interface PlacesAutocompleteProps {
  country?: string;
}

const PlacesAutocomplete2 = ({ country }: PlacesAutocompleteProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: {
        country: country || "",
      },
    },
    debounce: 300,
  });

  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    display: string;
  } | null>();

  useEffect(() => {
    var suggestions = data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return {
        value: place_id,
        // TODO: split main secondary text to separate row
        label: (
          <SuggestionWrapper>
            <SuggestionMain>{main_text}</SuggestionMain>
            <SuggestionSecondary>{secondary_text}</SuggestionSecondary>
          </SuggestionWrapper>
        ),
        displayvalue: `${main_text}, ${secondary_text}`,
      };
    });

    setOptions(suggestions);
  }, [data]);

  return (
    <AutoComplete
      value={selectedOption?.display}
      style={{ width: 400 }}
      options={options}
      onChange={(value) => {
        if (selectedOption) setSelectedOption(null);
        setValue(value);
      }}
      onSelect={(_, option) => {
        setSelectedOption({
          value: option.value,
          display: option.displayvalue,
        });
      }}
    />
  );
};

export default PlacesAutocomplete2;
