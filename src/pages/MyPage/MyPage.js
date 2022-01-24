import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../config';
import ReservationList from './ReservationList/ReservationList';

function MyPage() {
  const [mypageList, setMyPageList] = useState([]);
  const TOKEN = sessionStorage.getItem('token');

  useEffect(() => {
    fetch(API.GET_RESERVATION, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(res => setMyPageList(res.RESULT));
  }, []);

  return (
    <div>
      <SubTitle>
        <Title>MY PAGE</Title>
        <Text>마이 페이지</Text>
      </SubTitle>
      <MyPageWrap>
        <MyInfo>양주영님 반가워요!</MyInfo>
        <MyCount>
          스테이폴리오와 함께 {mypageList.length}번의 여행을 했어요
        </MyCount>
        <MyConWrap>
          <MyMenu>
            <MenuBox>
              <MenuTit>My Stay</MenuTit>
              <InfoTit>예약 정보</InfoTit>
            </MenuBox>
          </MyMenu>
          <MyContent>
            <StayWrap>
              <StayConWrap>
                {mypageList.map(reservation => (
                  <ReservationList
                    key={reservation.id}
                    information={reservation}
                  />
                ))}
              </StayConWrap>
            </StayWrap>
          </MyContent>
        </MyConWrap>
      </MyPageWrap>
    </div>
  );
}

export default MyPage;

const SubTitle = styled.div`
  max-width: 1330px;
  height: 200px;
  margin: 0 auto;
  padding: 140px 20px 0 20px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.weightBold};
  letter-spacing: 14px;
  text-indent: 14px;
`;

const Text = styled.div`
  margin: 10px 0 0;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.weightSemiBold};
  line-height: 28px;
`;

const MyPageWrap = styled.div`
  max-width: 1100px;
  margin: -15px auto 0;
  text-align: center;
`;

const MyInfo = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const MyCount = styled.div`
  margin: 0 0 60px;
  padding: 0 0 80px;
  font-size: 18px;
  color: #999;
  margin: 20px 0 0px;
  border-bottom: 3px solid #000;
`;

const MyConWrap = styled.div`
  display: flex;
  align-items: top;
  width: 100%;
`;

const MyMenu = styled.div`
  width: 25%;
  height: 400px;
`;

const MenuBox = styled.div`
  margin-top: 50px;
  font-size: 14px;
  line-height: 38px;
  text-align: left;
`;

const MenuTit = styled.div`
  width: 75%;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid black;
`;

const InfoTit = styled.div`
  margin-top: 10px;
  font-size: 18px;
`;

const MyContent = styled.div`
  display: flex;
  width: 75%;
  margin-top: 50px;
  padding: 20px 0 0;
  /* background: red; */
`;

const StayWrap = styled.div`
  width: 100%;
`;

const StayConWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;
