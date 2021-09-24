import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "context";
import LetterTile from "../LetterTile";
import { mobileCheck } from "utils";
import styled from "styled-components";

const StyledButtonNext = styled(ButtonNext)`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -0.4vw;
  margin: auto;
  border: none;
  outline: none;
`;

const StyledButtonBack = styled(ButtonBack)`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -0.4vw;
  margin: auto;
  border: none;
  outline: none;
`;

const Row = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: ${({ margin }) => margin};
`;

export default function TilesLine({ slogans, main, margin }) {
  const [shouldShow, updateShouldShow] = useState(false),
    [visibleSlides, setVisibleSlides] = useState(12),
    [buttonSize, setButtonSize] = useState(),
    [letterSize, setLetterSize] = useState(),
    [sortedLetters, setSortedLetters] = useState(),
    { data, sort, sortOrder } = useContext(GlobalContext);

  useEffect(() => {
    const checkedDevice = mobileCheck(),
      bigScreen = window.innerWidth > 1500,
      devidedWidth = parseInt(window.innerWidth / 100),
      sizes = {
        mobile: {
          button: { main: "4vw", secondary: "3.5vw" },
          letter: { main: "4.5vw", secondary: "3vw" },
          slides: { main: devidedWidth + 3, secondary: devidedWidth + 7 },
        },
        tablet: {
          button: { main: "3vw", secondary: "2.5vw" },
          letter: { main: "2.5vw", secondary: "2vw" },
          slides: { main: devidedWidth + 1, secondary: devidedWidth + 5 },
        },
        desktop: {
          button: { main: "2vw", secondary: "1.5vw" },
          letter: { main: "1.5vw", secondary: "1vw" },
          slides: {
            main: bigScreen ? 12 : devidedWidth - 1,
            secondary: bigScreen ? 16 : devidedWidth + 3,
          },
        },
      };
    setButtonSize(sizes[checkedDevice].button[main ? "main" : "secondary"]);
    setLetterSize(sizes[checkedDevice].letter[main ? "main" : "secondary"]);
    setVisibleSlides(sizes[checkedDevice].slides[main ? "main" : "secondary"]);
  }, [main]);

  useEffect(() => {
    setSortedLetters(sort(slogans));
  }, [sortOrder, data.slogans, sort, slogans]);

  useEffect(() => {
    sortedLetters && updateShouldShow(sortedLetters.length > visibleSlides);
  }, [sortedLetters, visibleSlides]);

  return sortedLetters ? (
    <Row margin={margin}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={sortedLetters.length}
        visibleSlides={visibleSlides}
        dragEnabled={shouldShow}
      >
        <Slider style={{ padding: "1px 0 1px 0" }}>
          {sortedLetters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile
                  main={main}
                  letter={val[0]}
                  number={val[1]}
                  size={letterSize}
                />
              </Slide>
            );
          })}
        </Slider>
        {shouldShow && (
          <div>
            <StyledButtonBack>
              <BsChevronLeft size={buttonSize} />
            </StyledButtonBack>
            <StyledButtonNext>
              <BsChevronRight size={buttonSize} />
            </StyledButtonNext>
          </div>
        )}
      </CarouselProvider>
    </Row>
  ) : (
    <></>
  );
}
