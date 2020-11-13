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

const Row = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 16px;
`;

export default function TilesLine({ letters }) {
  const [Device, setDevice] = useState();
  const visibleSlides = 12;
  const shouldShow = letters.length > visibleSlides ? true : false;
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
    <Row>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={letters.length}
        visibleSlides={visibleSlides}
        dragEnabled={shouldShow}
      >
        <Slider>
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
                      : "1.5vw"
                  }
                />
              </Slide>
            );
          })}
        </Slider>
        {shouldShow && (
          <div>
            <StyledButtonBack>
              <BsChevronLeft size="2vw" />
            </StyledButtonBack>
            <StyledButtonNext>
              <BsChevronRight size="2vw" />
            </StyledButtonNext>
          </div>
        )}
      </CarouselProvider>
    </Row>
  );
}
