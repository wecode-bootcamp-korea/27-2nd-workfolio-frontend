import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import NavDestinationModal from './NavDestinationModal/NavDestinationModal';
import NavCalendarModal from './NavCalendarModal/NavCalendarModal';

function Nav() {
  const [handleDestinationModal, setHandleDestinationModal] = useState(false);
  const [handleCalendarModal, setHandleCalendarModal] = useState(false);
  const TOKEN = sessionStorage.getItem('token');

  return (
    <NavBar>
      <NavBarContainer>
        <NavLogo>
          <Link to="/">
            <LogoImg src="/images/logo.svg" alt="워크 폴리오" />
          </Link>
        </NavLogo>

        <MenuContainer>
          <MenuWrapper>
            <ModalWrapper>
              {handleDestinationModal && (
                <NavDestinationModal closeModal={setHandleDestinationModal} />
              )}
              <DestinationButton
                onClick={() => {
                  setHandleDestinationModal(true);
                }}
              >
                <MenuButtonImg
                  src="/images/location.svg"
                  alt="어디서 시작할까요?"
                />

                <DestinationText>어디서 시작할까요?</DestinationText>
              </DestinationButton>
              {handleCalendarModal && (
                <NavCalendarModal closeModal={setHandleCalendarModal} />
              )}
              <CalendarButton
                onClick={() => {
                  setHandleCalendarModal(true);
                }}
              >
                <MenuButtonImg
                  src="/images/calendar.svg"
                  alt="언제 시작할까요?"
                />
                <CalendarText>언제 시작할까요?</CalendarText>
              </CalendarButton>
            </ModalWrapper>

            <DetailPageWrapper>
              <DetailMenu>
                <Link to="/list-page">
                  <Text> FIND OFFICE </Text>
                </Link>
                <Link to="/list-page">
                  <Text> PRE-ORDER</Text>
                </Link>
              </DetailMenu>
            </DetailPageWrapper>
          </MenuWrapper>
          <LogInContainer>
            <Link to="/my-page">
              <MyPage src="/images/person.svg" alt="마이 페이지" />
            </Link>
            <Link to="/login">
              {TOKEN === null ? (
                <LoginText>LOGIN</LoginText>
              ) : (
                <LoginText>LOGOUT</LoginText>
              )}
            </Link>
          </LogInContainer>
        </MenuContainer>
      </NavBarContainer>
    </NavBar>
  );
}

const borderBottom = props => css`
  border-bottom: 1px solid ${({ theme }) => theme.colorLightGray};
`;

const NavBar = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 80% ${borderBottom};
  background-color: ${({ theme }) => theme.colorWhite};
`;

const NavBarContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
  height: 75px;
  padding: 5px;
`;

const NavLogo = styled.div`
  cursor: pointer;
  padding: 0 350px 0 50px;
`;

const LogoImg = styled.img`
  width: 200px;
  height: 200px;
`;

const MenuContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'cneter')};
`;

const MenuWrapper = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'space-between')};
`;

const ModalWrapper = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
  padding-right: 50px;
`;

const DetailPageWrapper = styled.div`
  display: flex;
`;

const MenuButtonImg = styled.img`
  display: block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 40px;
`;

const DestinationText = styled.p`
  width: 120px;
  height: auto;
  padding: 5px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.weightSemiBold};
  color: ${({ theme }) => theme.colorBlack};
`;

const CalendarText = styled.p`
  width: 120px;
  height: auto;
  margin-right: 100px;
  padding: 5px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.weightSemiBold};
  color: ${({ theme }) => theme.colorBlack};
`;

const DetailMenu = styled.div`
  display: flex;
`;

const DestinationButton = styled.button`
  display: flex;
  cursor: pointer;
`;

const CalendarButton = styled.button`
  display: flex;
  cursor: pointer;
`;

const Text = styled.p`
  width: 100px;
  height: auto;
  margin-right: 20px;
  font-weight: ${({ theme }) => theme.weightBold};
  color: ${({ theme }) => theme.colorBlack};
`;

const LogInContainer = styled.div`
  display: flex;
  padding: 0 60px 3px 0;

  &::before {
    content: '|';
    margin-right: 30px;
    clear: both;
    overflow: hidden;
    color: ${({ theme }) => theme.colorGray};
  }
`;

const MyPage = styled.img`
  display: block;
  width: 15px;
  height: 15px;
  margin-right: 15px;
`;

const LoginText = styled.p`
  display: flex;
  margin-right: 50px;
  width: 100px;
  height: auto;
  font-weight: ${({ theme }) => theme.weightBold};
  color: ${({ theme }) => theme.colorBlack};
  margin-left: 5px;
`;

export default Nav;
