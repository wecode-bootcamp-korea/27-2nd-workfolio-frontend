import React from 'react';
import styled from 'styled-components';

function ReservationList({ information }) {
  return (
    <StayBox>
      <FlexWrapper>
        <Name>
          주문번호 : <OrderNum>{information.reservation_number}</OrderNum>
        </Name>
        <Stay>
          <Location>
            <Bold>오피스 : </Bold>
            {information.office_name}
          </Location>
          <Capacity>
            <Bold>체크인/체크아웃 : </Bold>
            {information.check_in_date} ~ {information.check_out_date}
          </Capacity>

          <Price>
            <Bold>결제금액 : </Bold>
            {Number(information.total_price).toLocaleString()}원
          </Price>
        </Stay>
      </FlexWrapper>
      <div>
        <Image src={information.office_image} alt="오피스 이미지" />
      </div>
    </StayBox>
  );
}

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StayBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
  text-align: left;
  border-bottom: 1px solid black;
`;

const Stay = styled.div`
  margin: 8px 0 40px;
  line-height: 1.5;
`;

const Name = styled.div`
  width: 95%;
  margin-bottom: 20px;
  font-size: 30px;
  line-height: 100%;
  font-weight: ${({ theme }) => theme.weightSemiBold};
  letter-spacing: -0.5px;
`;

const Location = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Capacity = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Price = styled.div`
  font-size: 16px;
`;

const Image = styled.img`
  width: 300px;
  margin-bottom: 50px;
  border-radius: 5px;
`;

const OrderNum = styled.span`
  font-weight: 200;
`;

const Bold = styled.span`
  font-weight: bold;
`;
export default ReservationList;
