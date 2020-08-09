import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import LetterTile from "../LetterTile";

export default function TilesLine() {
  return (
    <div styles={{ maxWidth: "100%", maxHeight: "20px" }}>
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={10}
        totalSlides={6}
        visibleSlides={1}
      >
        <Slider>
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
          <Slide index={3}>
            <LetterTile />
          </Slide>
          <Slide index={4}>I am the third Slide.</Slide>
          <Slide index={5}>I am the third Slide.</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  );
}
