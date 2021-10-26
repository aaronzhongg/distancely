import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AutoComplete, SelectProps } from "antd";
import styled from "styled-components";
import { Place } from "../../types/place";
import React from "react";
import { RefSelectProps } from "antd/lib/select";

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
  onSelectSuggestion?: (val: Place) => void;
  clearOnSelection?: boolean;
  // ref?: MutableRefObject<any>;
}

const PlacesAutocomplete2 = React.forwardRef<
  RefSelectProps,
  PlacesAutocompleteProps
>((props, ref) => {
  let {
    country,
    onSelectSuggestion,
    clearOnSelection,
    // ref,
  } = props;

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
  const [selectedOption, setSelectedOption] = useState<Place | null>();

  useEffect(() => {
    var suggestions = data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return {
        value: place_id,
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
      value={selectedOption?.displayText || value}
      style={{ width: 300 }}
      options={options}
      onChange={(value) => {
        if (selectedOption) setSelectedOption(null);
        setValue(value);
      }}
      onSelect={(_, option) => {
        var selectedPlace = {
          placeId: option.value,
          displayText: option.displayvalue,
        } as Place;
        setSelectedOption(selectedPlace);
        onSelectSuggestion && onSelectSuggestion(selectedPlace);
        // clearOnSelection && setSelectedOption(null) && setValue(""); // TODO: fix clear on selection defaulting to value (placeId)
      }}
      allowClear={true}
      autoFocus={true}
      ref={ref}
    />
  );
});

export default PlacesAutocomplete2;
