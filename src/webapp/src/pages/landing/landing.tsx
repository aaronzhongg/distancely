import React, { useRef, useState } from "react";
import styled from "styled-components";
import PlacesAutocomplete from "../../components/places-autocomplete-old";

const LandingWrapper = styled.div`
justify-content: center;
align-items: center;
`

const Hero = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;    
`

const HeroTitle = styled.h1`
`

const HeroSubtitle = styled.h3``

const Landing = () => {

return <LandingWrapper>
    <Hero>
        <HeroTitle >compare travel times.</HeroTitle>
        {/* <HeroSubtitle>where are you coming from?</HeroSubtitle> */}
        <PlacesAutocomplete
            //   setValue={(val) => {
            //     fromAddressRef.current = val;
            //   }}
            //   country={userCountry?.countryCode}
            //   onChangeHandler={(event) => {
            //     fromAddressRef.current = event.target.value;
            //   }}
            //   onSelectHandler={updateDestinationTravelTimes}
            //   onKeyDownHandler={(event) => {
            //     if (event.key === "Enter") updateDestinationTravelTimes();
            //   }}
              placeholderText={"From address."}
              labelText={"Where are you coming from?"}
            />
    </Hero>
</LandingWrapper>
}

export default Landing;