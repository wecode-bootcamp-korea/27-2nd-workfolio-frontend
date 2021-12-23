import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ABROAD_DATA from '../NavData/AbroadData';
import DOMESTIC_DATA from '../NavData/DomesticData';
import styled from 'styled-components';

function DestinationModal({ closeModal }) {
  const [inputValue, setInputValue] = useState('');
  const [changeButton, setChangeButton] = useState(null);
  const navigate = useNavigate();

  const handleInputValue = e => {
    console.log(123);
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      navigate('/list-page');
    }
  };

  const handleButton = e => {
    e.preventDefault();
    const { value } = e.target;
    setChangeButton(value);
  };

  const searchButtonHandle = () => {
    let btnValue = '';
    if (!inputValue && !changeButton) {
      alert('선택하거나 검색어를 입력해 주세요!');
      return;
    }

    if (changeButton > 12) {
      btnValue = DOMESTIC_DATA.find(data => data.id === changeButton).location;
    }

    if (changeButton <= 12) {
      btnValue = ABROAD_DATA.find(data => data.id === changeButton).location;
    }

    navigate(`/list-page?search=${inputValue}&anykey=${changeButton}`);
  };

  return (
    <ModalBackground>
      <ModalOverlay />
      <ModalContainer>
        <TitleContainer>
          <H1>어디서 시작할까요?</H1>
          <CloseButton onClick={() => closeModal(false)}> X </CloseButton>
        </TitleContainer>

        <MainContainer>
          <SearchingBarContainer>
            <form method="post" onKeyPress={handleSubmit}>
              <img src="/images/search.png" alt="찾기" />
              <input
                value={inputValue}
                onChange={handleInputValue}
                type="text"
                name="input"
                placeholder="원하는 스테이지/지역을 검색해 보세요."
              />
            </form>
          </SearchingBarContainer>

          <LocationDataContainer>
            <LocationDataWrapper>
              <LocationTitle>국내</LocationTitle>
              <LocationDomesticData>
                {DOMESTIC_DATA.map(el => {
                  return (
                    <p
                      className={`span ${
                        changeButton === el.id ? 'buttonChecked' : ''
                      }`}
                      key={el.id}
                      onClick={() => setChangeButton(el.id)}
                    >
                      {el.location}
                    </p>
                  );
                })}
              </LocationDomesticData>
            </LocationDataWrapper>

            <LocationDataWrapper>
              <LocationTitle>해외</LocationTitle>
              <LocationAbroadData>
                {ABROAD_DATA.map(el => {
                  return (
                    <p
                      className={`span ${
                        changeButton === el.id ? 'buttonChecked' : ''
                      }`}
                      key={el.id}
                      onClick={() => setChangeButton(el.id)}
                    >
                      {el.location}
                    </p>
                  );
                })}
              </LocationAbroadData>
            </LocationDataWrapper>
          </LocationDataContainer>
        </MainContainer>

        <ButtonContainer>
          <SearchingButton onClick={searchButtonHandle}>SEARCH</SearchingButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
`;

const ModalBackground = styled.div``;

const ModalContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 15%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colorGray};
  border-radius: 10px;
  width: 1125px;
  height: 700px;
  padding: 20px 20px 30px 20px;
  z-index: 99;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'space-between')};
  max-width: 1125px;
  padding: 0 60px 10px 0;
`;

const H1 = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.weightBold};
`;

const CloseButton = styled.button`
  width: 80px;
  height: 80px;
  padding-left: 90px;
  font-weight: ${({ theme }) => theme.weightThin};
  font-size: ${({ theme }) => theme.fontLarge};
  cursor: pointer;
`;

const MainContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
  padding-bottom: 300px;
  border-top: 1px solid ${({ theme }) => theme.colorLightGray};
  border-bottom: 1px solid ${({ theme }) => theme.colorLightGray};
  background-color: #fff;
`;

const SearchingBarContainer = styled.div`
  position: absolute;
  ${({ theme }) => theme.flex('row', 'center', 'center')};
  min-width: 500px;
  width: auto;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colorLightGray};
  color: ${({ theme }) => theme.colorGray};

  & form {
    ${({ theme }) => theme.flex('row', 'center', 'start')};
    width: 100%;
    padding: 10px 30px 10px 0;

    & img {
      width: 25px;
      height: 25px;
      padding: 3px 5px 0 0;
      color: ${({ theme }) => theme.colorGray};
    }

    & input {
      width: 100%;
      color: black;

      ::placeholder {
        max-width: 500px;
      }
    }
  }
`;

const LocationDataContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
`;

const LocationDataWrapper = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'space-between')};
`;

const LocationTitle = styled.div`
  position: absolute;
  top: 40%;
  width: 50px;
  font-size: 19px;
  font-weight: 700;
  ${({ theme }) => theme.colorLightGray};
`;
const LocationDomesticData = styled.div`
  width: 500px;
  height: 180px;

  & p {
    text-align: center;
    line-height: 32px;
    padding: 0 20px;
    margin: 20px 10px;
    cursor: pointer;
  }
  & .buttonChecked {
    background-color: #000;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    border-radius: 50px;
    box-shadow: 6px 6px 15px 0 rgb(0 0 0 / 20%);
    padding: 20 0px;
  }
`;

const LocationAbroadData = styled.div`
  width: 300px;
  height: 180px;

  & p {
    text-align: center;
    line-height: 32px;
    padding: 0 20px;
    margin: 20px 10px;
    cursor: pointer;
  }

  & .buttonChecked {
    background-color: #000;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    border-radius: 50px;
    box-shadow: 6px 6px 15px 0 rgb(0 0 0 / 20%);
    padding: 20 0px;
  }
`;

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
`;

const SearchingButton = styled.span`
  display: block;
  background-color: #000;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 64px;
  border-radius: 100px;
  box-shadow: 13px 15px 30px 0 rgb(0 0 0 / 40%);
  padding: 0 40px 0 40px;
  margin: 40px 20px;
  cursor: pointer;
`;

export default DestinationModal;
