import React, { useState, useRef, useEffect } from "react";
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
`;

export default function TilesLine() {
  const Letters = [
    { letter: "A", count: 100 },
    { letter: "Ą", count: 150 },
    { letter: "B", count: 50 },
    { letter: "C", count: 25 },
    { letter: "Ć", count: 200 },
    { letter: "D", count: 300 },
    { letter: "E", count: 250 },
    { letter: "Ę", count: 5 },
    { letter: "F", count: 350 },
    { letter: "G", count: 155 },
    { letter: "H", count: 255 },
    { letter: "I", count: 105 },
    { letter: "J", count: 325 },
    { letter: "K", count: 110 },
    { letter: "L", count: 215 },
    { letter: "Ł", count: 15 },
    { letter: "M", count: 225 },
  ];

  const slider = useRef(null);

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={17}
      visibleSlides={6}
    >
      <Row>
        <StyledSlider ref={slider}>
          {Letters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile letter={val.letter} count={val.count} />
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
