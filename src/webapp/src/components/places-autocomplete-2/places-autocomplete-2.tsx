import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { AutoComplete, SelectProps } from "antd";
import styled from "styled-components";

const SuggestionWrapper = styled.div``;
export interface PlacesAutocompleteProps {
  country?: string;
}

const PlacesAutocomplete2 = ({ country }: PlacesAutocompleteProps) => {
  console.log(country);
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

  useEffect(() => {
    var suggestions = data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return {
        // TODO: decouple value with display value
        value: place_id,
        label: (
          <SuggestionWrapper>
            <strong>{main_text}</strong> {secondary_text}
          </SuggestionWrapper>
        ),
        test: place_id,
      };
    });

    setOptions(suggestions);
  }, [data]);

  return (
    <AutoComplete
      value={value}
      style={{ width: 200 }}
      options={options}
      onChange={(value) => setValue(value)}
    />
  );
};

export default PlacesAutocomplete2;
