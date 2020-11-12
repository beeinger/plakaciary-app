import React, { useEffect, useState } from "react";
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
  right: -0.7vw;
  margin: auto;
  border: none;
  outline: none;
`;

const StyledButtonBack = styled(ButtonBack)`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -0.7vw;
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

export default function TilesLine({ letters }) {
  const [Device, setDevice] = useState();
  const [Show, setShow] = useState(() => (letters.length > 6 ? true : false));
  var counts = [];
  var sortedLetters = [];

  function mobileCheck() {
    if (window.innerWidth <= 992) {
      if (window.innerWidth <= 600) {
        return "mobile";
      }
      return "tablet";
    }
  }

  useEffect(() => {
    setShow(() => (letters.length >= 6 ? true : false));
    setDevice(mobileCheck());
  }, []);

  letters.sort((a, b) => a.count - b.count);
  letters.reverse();

  for (let i = 0; i < letters.length; i++) {
    counts.push(letters[i].count);
  }

  const uniqNums = [...new Set(counts)];

  for (let i = 0; i < uniqNums.length; i++) {
    const num = uniqNums[i];
    var toSort = [];
    for (let j = 0; j < letters.length; j++) {
      if (letters[j].count === num) {
        toSort.push(letters[j]);
      }
    }
    toSort.sort((a, b) =>
      a.letter > b.letter ? 1 : b.letter > a.letter ? -1 : 0
    );
    for (let j = 0; j < toSort.length; j++) {
      sortedLetters.push(toSort[j]);
    }
  }

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={letters.length}
      visibleSlides={6}
      dragEnabled={Show}
    >
      <Row>
        <StyledSlider>
          {sortedLetters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile
                  letter={val.letter}
                  number={val.count}
                  size={
                    Device === "mobile"
                      ? "10vw"
                      : Device === "tablet"
                      ? "8vw"
                      : "5vw"
                  }
                />
              </Slide>
            );
          })}
        </StyledSlider>
        {Show && (
          <div>
            <StyledButtonBack>
              <BsChevronLeft size="4vw" />
            </StyledButtonBack>
            <StyledButtonNext>
              <BsChevronRight size="4vw" />
            </StyledButtonNext>
          </div>
        )}
      </Row>
    </CarouselProvider>
  );
}
