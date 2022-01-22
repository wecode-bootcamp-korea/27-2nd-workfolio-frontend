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
  z-index: 9;
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
  ${({ theme }) => theme.flex('row', 'center', 'center')};
  min-width: 500px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colorLightGray};
  color: ${({ theme }) => theme.colorGray};

  & form {
    ${({ theme }) => theme.flex('row', 'center', 'start')};
    padding: 10px 30px 10px 10px;

    & img {
      width: 25px;
      height: 25px;
      padding: 2px 5px 0 0;
      color: ${({ theme }) => theme.colorGray};
    }

    & input {
      color: black;

      ::placeholder {
        max-width: 500px;
      }
    }
  }
`;

const LocationDataContainer = styled.div``;

const LocationDataWrapper = styled.div``;

const LocationTitle = styled.div``;
const LocationDomesticData = styled.div`
  & p {
    cursor: pointer;
  }
  & .buttonChecked {
    cursor: pointer;
  }
`;

const LocationAbroadData = styled.div`
  & p {
    cursor: pointer;
  }

  & .buttonChecked {
  }
`;

const ButtonContainer = styled.div``;

const SearchingButton = styled.span``;

export default DestinationModal;
