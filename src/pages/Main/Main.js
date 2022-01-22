import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainSlider from 'react-slick';

function Main() {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    // fetch('http://workfolio.kro.kr/buildings/1')
    // fetch('./data/space.json')
    fetch('./data/images.json')
      .then(response => response.json())
      .then(response => {
        const data = response.RESULT;
        setGetData([...data]);
      });
  }, []);

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
      <MainSlider {...settings} style={{ zIndex: -1 }}>
        {getData.map(({ id, url }) => {
          return (
            <div key={id}>
              <MainImg src={url} />
            </div>
          );
        })}
      </MainSlider>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: transparent;
  overflow-x: hidden;
`;

const MainImg = styled.img`
  width: 100vw;
  max-width: 1500px;
  height: 800px;
  margin: 0 auto;
`;

export default Main;
