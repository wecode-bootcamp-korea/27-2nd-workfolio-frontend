import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import RealDetailRoomCardInfo from './RealDetailRoomCardInfo';

function DetailRoomCard({ offices }) {
  const [dateRange, setDateRange] = useState([new Date()]);
  const [startDate, endDate] = dateRange;
  const [countList, setCountList] = useState({});
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  const roomSliderSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    // centerPadding: '60px',
    slidesToShow: 2.4,
    speed: 500,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
  };

  const commanderCount = (id, count) => {
    setCountList({ ...countList, [id]: count });
  };

  const reserveDate = date => {
    setReservationDate(date);
  };
  // const [calendarData, setCalendarData] = useState([{}, {}, {}]);
  //각각 캘린더의 정보
  const [isModalOpen, setIsModalOpen] = useState(false);
  //캘린더가 열려 있는지 안 열려 있는지
  const [selectedIndex, setSelectedIndex] = useState(0);
  //몇 번째 슬라이드가 클릭이 됐는지

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateIndex = id => {
    setSelectedIndex(id);
  };
  // calendarData[selectedIndex].startDate
  return (
    <ContainerRoom>
      {isModalOpen && (
        <CalendarModal
          disabledDateRange={offices[0].reservations}
          excludeDateIntervals={
            !!reservationDate.length &&
            reservationDate.map((date, idx) => {
              const start_date = new Date(reservationDate[idx][0]);
              const end_date = new Date(reservationDate[idx][1]);
              start_date.setDate(start_date.getDate() - 1);
              end_date.setDate(end_date.getDate() - 1);

              return {
                start: start_date,
                end: end_date,
              };
            })
          }
          minDate={new Date()}
          closeModal={closeModal}
          startDate={startDate}
          endDate={endDate}
          setDateRange={setDateRange}
          countList={countList}
          offices={offices}
          selectedIndex={selectedIndex}
        />
      )}
      <RoomCon>
        <RoomConTit>ROOM</RoomConTit>
      </RoomCon>
      <RoomSlider {...roomSliderSettings}>
        {offices?.map((office, idx) => {
          return (
            <RealDetailRoomCardInfo
              countList={countList}
              openModal={openModal}
              key={idx}
              offices={office}
              commanderCount={commanderCount}
              updateIndex={updateIndex}
              // isModalOpen={isModalOpen}
              // CalendarModal={CalendarModal}
              reserveDate={reserveDate}
            />
            // <RoomInfoWrap key={idx}>
            //   <RoomImg key={office.id} src={office.image} />
            //   <RoomInfo>
            //     <RoomName>
            //       {office.name}
            //       <Small
            //         marginTop="5px"
            //         fontSize="14px"
            //         color="hsla(0,0%,100%,.5)"
            //         letterSpacing="1.5px"
            //       >
            //         기본형
            //       </Small>
            //     </RoomName>
            //     <RoomPrice>{Number(office.price.toLocaleString())}</RoomPrice>
            //     <RoomEtc>
            //       기준 {office.capacity}명 / (최대 {office.capacity_max}
            //       명)
            //     </RoomEtc>
            //     <RoomCalendar
            //       onClick={() => {
            //         openModal();
            //         reserveDate(office.reservations);
            //       }}
            //     >
            //       <AiFillCalendar className="Roomcalendar" />
            //     </RoomCalendar>
            //     <CheckUsers>
            //       인원
            //       <InCreaseButton onClick={onIncreaseUsers}>
            //         <AiOutlinePlus />
            //       </InCreaseButton>
            //       {checkNumbers}
            //       <DeCreaseButton onClick={onDecreaseUsers}>
            //         <AiOutlineMinus />
            //       </DeCreaseButton>
            //     </CheckUsers>
            //   </RoomInfo>
            // </RoomInfoWrap>
          );
        })}
      </RoomSlider>
    </ContainerRoom>
  );
}

export default DetailRoomCard;

const ContainerRoom = styled.div`
  position: relative;
  height: 700px;
  margin: 140px auto 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 700px;
    background: #f5f5f5;
    z-index: -1;
  }
`;

const RoomCon = styled.div`
  max-width: 1330px;
  padding: 120px 20px 0;
  margin: ${({ theme }) => theme.marginCenter};

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    margin-top: 30px;
    background: ${({ theme }) => theme.colorBlack};
  }
`;

const RoomConTit = styled.div`
  margin-top: 35px;
  color: ${({ theme }) => theme.colorBlack};
  font-size: 40px;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.weightBold};
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

const RoomSlider = styled(Slider)`
  position: absolute;
  top: 120px;
  left: 40%;
  right: 0;
  /* width: 100%; */
  margin-left: -230px;
  box-shadow: 13px 15px 30px 0 rgb(0 0 0 / 20%);
  background-position: center center;

  .slick-next:before,
  .slick-prev:before {
    content: '';
    background: red;
  }

  .slick-arrow {
    &:hover {
      opacity: 1;
    }
  }

  .slick-list .slick-slide {
    width: 460px;
    height: 460px;
  }
`;

const PrevButton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: yellow;
  margin-right: 20px;
  background: url('https://www.stayfolio.com/web/images/arw-fsdetail03.png')
    no-repeat;
  background-position: 0 0px;
  cursor: pointer;
  z-index: 200;
  left: -270px;

  &:hover {
    background: url('https://www.stayfolio.com/web/images/arw-fsdetail03.png')
      no-repeat;
  }
`;

const NextButton = styled.div`
  width: 70px;
  height: 70px;
  left: -190px;
  border-radius: 50%;
  background: yellow;
  background: url('https://www.stayfolio.com/web/images/arw-fsdetail03.png')
    no-repeat;
  background-position: 0 -70px;
  cursor: pointer;
  z-index: 200;

  &:hover {
    left: -190px;
    background: url('https://www.stayfolio.com/web/images/arw-fsdetail03.png')
      no-repeat;
    background-position: 0 -70px;
  }
`;

// const RoomImg = styled.img`
//   width: 100%;
//   height: 460px;
//   margin: ${({ theme }) => theme.marginCenter};
// `;

// const RoomInfoWrap = styled.div`
//   position: relative;
// `;

// const RoomInfo = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 140px;
//   background: rgba(0, 0, 0, 0.75);
//   color: ${({ theme }) => theme.colorWhite};
// `;

// const RoomImgWrap = styled.div`
//   width: 460px;
//   height: 460px;
//   background: red;
// `;

// const RoomName = styled.div`
//   position: absolute;
//   width: 290px;
//   left: 30px;
//   bottom: 75px;
//   font-size: 24px;
//   font-weight: 500;
// `;

// const RoomPrice = styled.div`
//   position: absolute;
//   right: 30px;
//   bottom: 90px;
//   font-size: 21px;
// `;

// const RoomEtc = styled.div`
//   position: absolute;
//   left: 30px;
//   bottom: 30px;
//   font-size: ${({ theme }) => theme.fontRegular};
// `;

// const RoomCalendar = styled.button`
//   .Roomcalendar {
//     position: absolute;
//     left: 160px;
//     bottom: 28px;
//     width: 20px;
//     height: 20px;
//     color: ${({ theme }) => theme.colorWhite};
//   }
// `;

// const CheckUsers = styled.div`
//   display: block;
//   position: absolute;
//   right: 30px;
//   bottom: 25px;
//   font-size: 13px;
//   line-height: 25px;
//   letter-spacing: 1.5px;
// `;

// const InCreaseButton = styled.button`
//   background: ${({ theme }) => theme.colorWhite};
//   margin: 0 10px;
//   padding: 5px;
//   font-size: 14px;
//   font-weight: 700;
// `;

// const DeCreaseButton = styled.button`
//   background: ${({ theme }) => theme.colorWhite};
//   margin: 0 0 0 10px;
//   padding: 5px;
//   font-size: 14px;
//   font-weight: 700;
// `;
