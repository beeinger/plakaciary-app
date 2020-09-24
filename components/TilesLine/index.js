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
`;

const Letters = [
  { letter: "A", count: "123" },
  { letter: "B", count: "456" },
  { letter: "C", count: "789" },
  { letter: "D", count: "120" },
  { letter: "E", count: "308" },
  { letter: "F", count: "465" },
  { letter: "G", count: "578" },
  { letter: "H", count: "255" },
  { letter: "I", count: "586" },
  { letter: "J", count: "4361" },
  { letter: "K", count: "12" },
  { letter: "L", count: "1894" },
  { letter: "M", count: "758" },
  { letter: "N", count: "69" },
  { letter: "O", count: "253" },
  { letter: "P", count: "764" },
  { letter: "R", count: "61" },
  { letter: "S", count: "5" },
  { letter: "T", count: "8" },
];

export default function TilesLine({ letters }) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={19}
      visibleSlides={6}
    >
      <Row>
        <StyledSlider>
          {letters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile letter={val.letter} number={val.count} />
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
