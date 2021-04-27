import React, { useEffect } from "react";
import styled from "styled-components";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent } from "react";

// https://github.com/wellyshen/use-places-autocomplete
// https://developers.google.com/maps/documentation/javascript/places-autocomplete
// https://developers.google.com/maps/documentation/places/web-service/autocomplete
const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
    callbackName: "initMap",
  });

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: Suggestion) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // // Get latitude and longitude via utility functions
    // getGeocode(args: google.maps.GeocoderRequest)
    //   .then((results) => getLatLng(results[0]))
    //   .then(({ lat, lng }) => {
    //     console.log("📍 Coordinates: ", { lat, lng });
    //   })
    //   .catch((error) => {
    //     console.log("😱 Error: ", error);
    //   });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
