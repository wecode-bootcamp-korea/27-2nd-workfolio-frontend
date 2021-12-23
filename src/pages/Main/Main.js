import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainSlider from 'react-slick';

function Main() {
  const [getData, setGetData] = useState({});

  useEffect(() => {
    fetch('http://workfolio.kro.kr/buildings/1')
      .then(response => response.json())
      .then(response => {
        setGetData(response.RESULT);
      });
  }, []);
  const { images } = getData;

  const settings = {
    dots: true,
    infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
    <BackGround>
      <MainSlider {...settings}>
        {images?.map((image, index) => {
          return (
            <div key={index}>
              <MainImg src={image.url} />
            </div>
          );
        })}
      </MainSlider>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: ${({ theme }) => theme.colorWhite};
`;

const MainImg = styled.img`
  width: 1702px;
  height: 850px;
`;

export default Main;
