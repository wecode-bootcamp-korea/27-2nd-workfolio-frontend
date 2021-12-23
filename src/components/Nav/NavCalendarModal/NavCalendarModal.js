import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDays } from 'date-fns';
import CalendarPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarCustom.css';
import styled from 'styled-components';

function CalendarModal({ closeModal }) {
  const [dateRange, setDateRange] = useState([new Date()]);
  const [startDate, endDate] = dateRange;

  return (
    <ModalBackground>
      <ModalOverlay />
      <ModalContainer>
        <TitleContainer>
          <H1>언제 시작할까요?</H1>
          <CloseButton onClick={() => closeModal(false)}> X </CloseButton>
        </TitleContainer>
        <MainContainer>
          <CalendarPicker
            inline
            selectsRange={true}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            numberOfMonths={2}
            minDate={new Date()}
            maxDate={addDays(new Date(), 100)}
            onChange={data => {
              setDateRange(data);
            }}
            dateFormat="MM월"
            monthsShown={2}
            focusSelectMonth={false}
          />
        </MainContainer>

        <SearchingContainer>
          <Link to="/detail-page">
            <SearchingButton>SEARCH</SearchingButton>
          </Link>
        </SearchingContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
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
  height: 600px;
  padding: 20px 20px 30px 20px;
  z-index: 99;
  background: #fff;
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'space-between')};
  width: auto;
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
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.colorLightGray};
  border-bottom: 1px solid ${({ theme }) => theme.colorLightGray};
  background-color: #fff;

  & CalendarPicker {
    max-width: 1084px;
    width: 70%;
    height: auto;
    color: white;
    border: 1px solid;
  }
`;

const SearchingContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')};
`;

const SearchingButton = styled.button`
  display: block;
  background-color: #000;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 64px;
  border-radius: 100px;
  box-shadow: 13px 15px 30px 0 rgb(0 0 0 / 40%);
  padding: 0 40px 0 40px;
  margin: 40px 20px;
`;

export default CalendarModal;
