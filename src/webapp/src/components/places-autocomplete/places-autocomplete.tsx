import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";

import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent } from "react";
import TextField from "../text-field";
import { device } from "../../breakpoints";
import { TextFieldProps } from "../text-field/text-field";

const PlacesAutocompleteWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SuggestionList = styled.ul`
  position: absolute;
  padding: 25px 0px 0px 0px;
  max-height: 60%;
  border: 1px solid;
  border-top: none;
  list-style-type: none;
  text-align: left;
  overflow-y: auto;
  background: white;
  border-radius: 0px 0px 20px 20px;

  // todo: position/size fix this hack
  margin: 50px 0px 0px 0px;
  width: 288px;

  @media ${device.sm_and_larger} {
    width: 388px;
  }
`;

const Item = styled.li<{ active: boolean }>`
  padding: 0.8rem 1.2rem;
  cursor: pointer;

  background: ${(props) => (props.active ? "#2ba84a" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

let cachedVal = "";
const acceptedKeys = ["ArrowUp", "ArrowDown", "Escape", "Enter"];

export interface PlacesAutocompleteProps {
  country?: string;
  setValue?: (val: string) => void;
  clearOnEnterKeyPress?: boolean;
  clearOnSelect?: boolean;
  onSelectHandler?: () => void;
}

// https://github.com/wellyshen/use-places-autocomplete
// https://developers.google.com/maps/documentation/javascript/places-autocomplete
// https://developers.google.com/maps/documentation/places/web-service/autocomplete

// todo: refactor nested TextField component event handlers
const PlacesAutocomplete = ({
  country,
  setValue: setTextValue,
  clearOnEnterKeyPress,
  clearOnSelect,
  onSelectHandler,

  // text field
  onChangeHandler,
  // onKeyPressHandler,
  onKeyDownHandler,
  placeholderText,
  value: textValue,
  labelText,

  // button
  onButtonClickHandler,
  buttonText,
}: TextFieldProps & PlacesAutocompleteProps) => {
  const [currIndex, setCurrIndex] = useState<number | null>(null);
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
  const hasSuggestions = status === "OK";

  const dismissSuggestions = () => {
    setCurrIndex(null);
    clearSuggestions();
  };

  const ref = useOnclickOutside(dismissSuggestions);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    cachedVal = e.target.value;
  };

  const handleSelect = ({ description }: Suggestion) => {
    setValue(description, false);
    setTextValue && setTextValue(description);
    dismissSuggestions();
  };

  const handleEnter = (idx: number) => () => {
    setCurrIndex(idx);
  };

  const handleLeave = () => {
    setCurrIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!hasSuggestions || !acceptedKeys.includes(e.key)) return;

    if (e.key === "Enter") {
      setTextValue && setTextValue(value);
      dismissSuggestions();
      return;
    }

    if (e.key === "Escape") {
      setValue(cachedVal, false);
      dismissSuggestions();
      return;
    }

    let nextIndex: number | null;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = currIndex ?? data.length;
      nextIndex = nextIndex > 0 ? nextIndex - 1 : null;
    } else {
      nextIndex = currIndex ?? -1;
      nextIndex = nextIndex < data.length - 1 ? nextIndex + 1 : null;
    }

    setCurrIndex(nextIndex);
    // @ts-expect-error
    setValue(data[nextIndex] ? data[nextIndex].description : cachedVal, false);

    setTextValue &&
      setTextValue(
        // @ts-expect-error
        data[nextIndex] ? data[nextIndex].description : cachedVal
      );
  };

  const renderSuggestions = () =>
    data.map((suggestion: Suggestion, idx: number) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Item
          id={`sug-list-item-${idx}`}
          key={place_id}
          onClick={() => {
            handleSelect(suggestion);
            onSelectHandler && onSelectHandler();
            if (clearOnSelect) setValue("");
          }}
          onMouseEnter={handleEnter(idx)}
          active={idx === currIndex}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </Item>
      );
    });

  return (
    <PlacesAutocompleteWrapper ref={ref}>
      <TextField
        value={value}
        onChangeHandler={(e) => {
          handleInput(e);
          onChangeHandler && onChangeHandler(e);
        }}
        onKeyDownHandler={(e) => {
          handleKeyDown(e);
          onKeyDownHandler && onKeyDownHandler(e);
          if (e.key === "Enter" && clearOnEnterKeyPress) setValue("");
        }}
        disabled={!ready}
        labelText={labelText}
        placeholderText={placeholderText}
        style={{ zIndex: hasSuggestions ? 100 : 0 }}
        onButtonClickHandler={(e) => {
          setTextValue && setTextValue(value);
          dismissSuggestions();
          onButtonClickHandler && onButtonClickHandler(e);
          setValue("");
        }}
        buttonText={buttonText}
      />
      {hasSuggestions && (
        <SuggestionList
          onMouseLeave={handleLeave}
          style={{ zIndex: hasSuggestions ? 90 : 0 }}
        >
          {renderSuggestions()}
        </SuggestionList>
      )}
    </PlacesAutocompleteWrapper>
  );
};

export default PlacesAutocomplete;
