import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Building({ space }) {
  const {
    name,
    city,
    district,
    min_capacity,
    max_capacity,
    min_price,
    max_price,
    image,
    id,
  } = space;

  const navigate = useNavigate();

  const moveToDetail = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <Container>
      <Head1 onClick={moveToDetail}>{name}</Head1>
      <FlexBox>
        <div>
          <Head3>
            {city}/{district}
          </Head3>
          <Head3>
            기준 {min_capacity}명 (최대{max_capacity}명)
          </Head3>
          <Head3>
            ￦{Number(min_price).toLocaleString()} ~ ￦
            {Number(max_price).toLocaleString()}
          </Head3>
          <Button onClick={moveToDetail}>예약하기</Button>
        </div>
        <div>
          <Img onClick={moveToDetail} src={image} alt="space" />
        </div>
      </FlexBox>
    </Container>
  );
}

const Container = styled.div`
  width: 47%;
`;

const Head1 = styled.h1`
  font-size: 32px;
  font-weight: 500;
  cursor: pointer;
`;

const Head3 = styled.h3`
  font-size: 14px;
  margin-top: 15px;
`;

const Button = styled.button`
  font-size: 14px;
  border-bottom: 1px solid #000;
  font-weight: 700;
  margin-top: 50px;
  cursor: pointer;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 407px;
  height: 230px;
  margin: 30px 0 80px 50px;
  cursor: pointer;
`;

export default Building;
