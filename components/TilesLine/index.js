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

export default function TilesLine({ slogans }) {
  const [letters, setLetters] = useState(),
    [shouldShow, updateShouldShow] = useState(false),
    [device, setDevice] = useState();

  useEffect(() => {
    setDevice(mobileCheck());
  }, []);

  useEffect(() => {
    letters && updateShouldShow(letters.length > 6);
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
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={letters.length}
      visibleSlides={6}
      dragEnabled={shouldShow}
    >
      <Row>
        <StyledSlider>
          {letters.map((val, idx) => {
            return (
              <Slide key={idx}>
                <LetterTile
                  letter={val[0]}
                  number={val[1]}
                  size={
                    device === "mobile"
                      ? "10vw"
                      : device === "tablet"
                      ? "8vw"
                      : "5vw"
                  }
                />
              </Slide>
            );
          })}
        </StyledSlider>
        {shouldShow && (
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
  ) : (
    <></>
  );
}
