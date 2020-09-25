import React from "react";
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  Slide,
} from "pure-react-carousel";
import LetterTile from "../LetterTile";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import styled from "styled-components";

const StyledButtonNext = styled(ButtonNext)`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin: auto;
  border: none;
  outline: none;
`;

const StyledButtonBack = styled(ButtonBack)`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  margin: auto;
  border: none;
  outline: none;
`;

const StyledSlider = styled(Slider)`
  height: 100%;
`;

const Row = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 16px;
`;

export default function TilesLine({ length, letters, size }) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={length}
      visibleSlides={6}
    >
      <Row>
        <StyledSlider>
          {letters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile
                  letter={val.letter}
                  number={val.count}
                  size={size}
                />
              </Slide>
            );
          })}
        </StyledSlider>
        <StyledButtonBack>
          <BsChevronLeft size="50px" />
        </StyledButtonBack>
        <StyledButtonNext>
          <BsChevronRight size="50px" />
        </StyledButtonNext>
      </Row>
    </CarouselProvider>
  );
}
