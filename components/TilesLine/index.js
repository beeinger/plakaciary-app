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
import { mobileCheck, getCharactersCount } from "utils";

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
  margin-bottom: 16px;
`;

export default function TilesLine({ slogans, main }) {
  const [letters, setLetters] = useState(),
    [shouldShow, updateShouldShow] = useState(false),
    [device, setDevice] = useState(),
    [visibleSlides, setVisibleSlides] = useState(12),
    [buttonSize, setButtonSize] = useState(),
    [letterSize, setLetterSize] = useState();

  useEffect(() => {
    const checkedDevice = mobileCheck();
    const bigScreen = window.innerWidth > 1500;
    const devidedWidth = parseInt(window.innerWidth / 100);
    console.log(checkedDevice);
    device === "mobile" ? "4.5vw" : device === "tablet" ? "2.5vw" : "1.5vw";
    if (main) {
      switch (checkedDevice) {
        case "mobile":
          console.log("mobile");
          setButtonSize("4vw");
          setLetterSize("4.5vw");
          setVisibleSlides(devidedWidth + 3);
          break;
        case "tablet":
          console.log("tablet");
          setButtonSize("3vw");
          setLetterSize("2.5vw");
          setVisibleSlides(devidedWidth + 1);
          break;
        case "desktop":
          console.log("desktop");
          setButtonSize("2vw");
          setLetterSize("1.5vw");
          setVisibleSlides(bigScreen ? 12 : devidedWidth - 1);
      }
    } else {
      switch (checkedDevice) {
        case "mobile":
          console.log("mobile");
          setButtonSize("3.5vw");
          setLetterSize("3vw");
          setVisibleSlides(devidedWidth + 7);
          break;
        case "tablet":
          console.log("tablet");
          setButtonSize("2.5vw");
          setLetterSize("2vw");
          setVisibleSlides(devidedWidth + 5);
          break;
        case "desktop":
          console.log("desktop");
          setButtonSize("1.5vw");
          setLetterSize("1vw");
          setVisibleSlides(bigScreen ? 16 : devidedWidth + 3);
      }
    }

    console.log(bigScreen ? 12 : parseInt(window.innerWidth / 100));
    setDevice(checkedDevice);
    console.log(visibleSlides);
  }, []);

  useEffect(() => {
    letters && updateShouldShow(letters.length > visibleSlides);
  }, [letters]);

  useEffect(() => {
    if (!slogans) return;
    const allLettersString = slogans.join("").split(" ").join("");
    sortLetters(getCharactersCount(allLettersString));
  }, [slogans]);

  function sortLetters(_letters) {
    var letters = [..._letters];
    letters
      .sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0))
      .sort((a, b) => (a[1] - b[1]) * -1);
    setLetters(letters);
  }

  return letters ? (
    <Row>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={letters.length}
        visibleSlides={visibleSlides}
        dragEnabled={shouldShow}
      >
        <Slider>
          {letters.map((val, idx) => {
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
