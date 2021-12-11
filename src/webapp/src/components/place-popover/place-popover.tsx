import { Button, Col, Popover } from "antd";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";
import { Place } from "../../types/place";
import { MouseEventHandler, useState } from "react";

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

const AbsoluteButton = styled(Button)`
  position: absolute;
  height: inherit;
`;

export interface PlacePopoverProps {
  place: Place;
  deleteButtonOnClickHandler: MouseEventHandler<HTMLElement>;
}

const PlacePopover = ({
  place,
  deleteButtonOnClickHandler,
}: PlacePopoverProps) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
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
        <div
          onMouseEnter={() => setShowDeleteButton(true)}
          onMouseLeave={() =>
            setTimeout(
              function () {
                setShowDeleteButton(false);
              }.bind(this),
              400
            )
          }
        >
          {place.mainText}
          {showDeleteButton && (
            <AbsoluteButton
              icon={<DeleteOutlined />}
              onClick={deleteButtonOnClickHandler}
              type={"text"}
            />
          )}
        </div>
      </Popover>
    </Wrapper>
  );
};

export default PlacePopover;
