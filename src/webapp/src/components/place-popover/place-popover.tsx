import { Col, Popover } from "antd";
import styled from "styled-components";
import { Place } from "../../types/place";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: auto;
`;

const PlaceDetails = styled.div``;

const PlaceDetailsHeading = styled.div`
  font-weight: bold;
  font-size: 12px;
`;

const PlaceDetailsSubheading = styled.div`
  font-size: 10px;
`;

export interface PlacePopoverProps {
  place: Place;
}

const PlacePopover = ({ place }: PlacePopoverProps) => {
  return (
    <Wrapper>
      <Popover
        content={
          <PlaceDetails>
            <PlaceDetailsHeading>{place.mainText}</PlaceDetailsHeading>
            <PlaceDetailsSubheading>
              {place.secondaryText}
            </PlaceDetailsSubheading>
          </PlaceDetails>
        }
      >
        {place.mainText}
      </Popover>
    </Wrapper>
  );
};

export default PlacePopover;
