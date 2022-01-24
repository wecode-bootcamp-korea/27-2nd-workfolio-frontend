import React, { useEffect, useState } from 'react';
import DetailSpecialCard from './DetailSpecialCard';
import DetailRoomCard from './DetailRoomCard';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useParams } from 'react-router-dom';
import { API } from '../../config';

function Detail() {
  const { id } = useParams();

  const [detailContents, setDetailContents] = useState([]);
  useEffect(() => {
    fetch(`${API.GET_BUILDINGS}/${id}`)
      .then(response => response.json())
      .then(data => setDetailContents(data.RESULT));
  }, [id]);

  const {
    name,
    city,
    district,
    title,
    specials,
    images,
    sub_title,
    description,
    offices,
  } = detailContents;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
    <div>
      <ContainerWide>
        <GoBackButton>
          <GoBackImg />
          돌아가기
        </GoBackButton>
        <Name>{name}</Name>
        <StyledSlider {...settings}>
          {images?.map((image, index) => {
            return (
              <div key={index}>
                <TopImg src={image.url} />
              </div>
            );
          })}
        </StyledSlider>
        <Info>
          <InfoText>{title}</InfoText>
          <InfoName>
            {name}
            <Small
              marginTop="6px"
              fontSize="12px"
              color="#a5a5a5"
              fontWeight="100"
              letterSpacing="1.5px"
              paddingBottom="4px"
            >
              {city} / {district}
            </Small>
          </InfoName>
        </Info>
      </ContainerWide>
      <Calendar />
      <DetailRoomCard offices={offices} />
      <DetailInfoWrapper>
        <DetailTitle>
          {sub_title}
          <Small
            fontSize="14px"
            display="block"
            letterSpacing="7px"
            marginTop="15px"
          >
            {name}
          </Small>
        </DetailTitle>
        <DetailText>{description}</DetailText>
      </DetailInfoWrapper>
      <DetailSpecialContainer>
        <SpecialWrap>
          <SpecialTitle>SPECIAL</SpecialTitle>
          <DetailSpecialCard specials={specials} />
        </SpecialWrap>
      </DetailSpecialContainer>
      )
    </div>
  );
}

export default Detail;

const ContainerWide = styled.div`
  position: relative;
  width: 100%;
  background-color: red;
`;

const GoBackImg = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url('https://www.stayfolio.com/web/images/ico-back.png') no-repeat
    0 50%;
`;

const GoBackButton = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 75px;
  right: 20px;
  padding: 10px 0 10px 42px;
  color: ${({ theme }) => theme.colorBlack};
  font-size: 13px;
  background: url(/web/images/ico-back.png) no-repeat 0 50%;
`;

const Name = styled.div`
  max-width: 1800px;
  padding: 80px 0 30px 20px;
  color: ${({ theme }) => theme.colorBlack};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }

  .slick-arrow {
    width: 60px;
    height: 60px;
    background-size: cover;
    opacity: 0.5;
    z-index: 200;

    &:hover {
      opacity: 1;
    }
  }

  .slick-next::before,
  .slick-prev::before {
    content: '';
  }

  .slick-next {
    background-image: url('https://www.stayfolio.com/web/images/journal-detail-arrow-right.png');
    right: 0;
  }

  .slick-prev {
    width: 60px;
    height: 60px;
    left: 0;
    background-image: url('https://www.stayfolio.com/web/images/journal-detail-arrow-left.png');
    background-size: cover;
    z-index: 200;
  }
`;

const TopImg = styled.img`
  position: relative;
  width: 100%;
  height: 650px;
  margin: 0 auto;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 4px;
  width: 1280px;
  height: 80px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
`;

const InfoText = styled.p`
  display: inline-block;
  width: 50%;
  padding: 0 30px;
  color: ${({ theme }) => theme.colorWhite};
  font-size: 26px;
  font-weight: 100;
  overflow: hidden;
  white-space: nowrap;
`;

const InfoName = styled.p`
  display: inline-block;
  width: 23%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
`;

const Small = styled.div`
  display: block;
  margin-top: ${({ marginTop }) => marginTop};
  padding-bottom: ${({ paddingTop }) => paddingTop};
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
`;

const Calendar = styled.div`
  max-width: 1330px;
  margin: 80px auto 0;
`;

const DetailInfoWrapper = styled.div`
  position: relative;
  max-width: 1330px;
  margin: 120px auto 0;
  padding: 0 20px;
  text-align: center;
`;

const DetailTitle = styled.div`
  font-size: 25px;
  color: #222;
  text-align: center;
  font-weight: ${({ theme }) => theme.weightSemiBold};

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 40px;
    margin: 25px auto 0;
    background: ${({ theme }) => theme.colorBlack};
  }
`;

const DetailText = styled.div`
  width: 780px;
  margin: 20px auto 0;
  font-size: 16px;
  line-height: 2.2;
`;

const DetailSpecialContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 70px auto;
  padding: 120px 0;
  text-align: center;
  background-image: url('https://images.stayfolio.com/system/pictures/images/000/097/460/original/90f946398305e81252fd3c8361fdc479141efc29.jpg?1634533363');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const SpecialWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const SpecialTitle = styled.div`
  display: block;
  margin: 0 auto 20px;
  padding: 0 0 0 21px;
  color: ${({ theme }) => theme.colorWhite};
  font-size: 30px;
  font-size: 21px;
  letter-spacing: 21px;
`;
