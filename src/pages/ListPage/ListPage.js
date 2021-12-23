import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Filter from './Filter/Filter';
import ListButton from './ListButton/ListButton';
import SpaceList from './SpaceList/SpaceList';
import { API } from '../../config';

function ListPage() {
  const [spaceList, setSpaceList] = useState([]);
  const [pages, setPages] = useState([]);
  const [themeList, setThemeList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const LOCATION_SEARCH = location.search;

  const disassembleFactory = () => {
    //LOCATION_SEARCH 를 객체형태로 변환해주는 로직
    if (!!LOCATION_SEARCH) {
      //쿼리가 빈 값이 아니라면
      const unraveldSearch = LOCATION_SEARCH.slice(1) // '?' 뒤부터 '=' 는 ':'로 바꾸고 '&'를 기준으로 배열로 나눔
        .replaceAll('=', ':')
        .split('&');
      const tempObj = { special: [] }; // allList에 담을 빈 객체 생성
      unraveldSearch.forEach(list => {
        //나눠진 배열을 ':' 기준으로 한번 더 나누고 빈 객체의 key에는 필터명을 value에는 필터내용을 넣어준다
        const listName = list.split(':');

        if (listName[0] === 'special') {
          //listName[0](key명)이 'specials'라면 listName[1](value값)을 specials가 키값인 배열에 push넣어주고 아니라면 객체에 삽입
          tempObj.special.push(listName[1]);
        } else {
          tempObj[listName[0]] = listName[1];
        }
      });
      return tempObj;
    } else {
      return {};
    }
  };

  const assembleFactory = queryObject => {
    //*** 쿼리 주소로 navigate하는 로직 ***//
    const arrAllList = []; // 배열을 담는 객체 변수 생성
    for (const i in queryObject) {
      //하나의 객체로 관리되고 있는 queryObject에서 => 리스트 안에 객체가 들어있는 형태로 바꿔주는 로직
      const temp = {};
      temp[i] = queryObject[i];
      arrAllList.push(temp);
    }

    const existArr = arrAllList.filter(
      el => Object.values(el)[0] !== '' && Object.values(el)[0].length !== 0
    ); // value가 존재하는 객체만 필터링 해주는 로직 // 빈 배열이 있거나 ''빈 값이면 필터링됨

    const queryStringArr = existArr //객체에서 쿼리 스트링으로 변환시켜주는 로직
      .map(el =>
        Object.keys(el)[0] === 'special' // key값이 'specials'이면 specials='테마명' 쿼리식으로 풀어주는 로직
          ? Object.values(el)[0]
              .map(element => `special=${element}`)
              .join('&')
          : `${Object.keys(el)[0]}=${Object.values(el)[0]}`
      )
      .join('&');

    return queryStringArr;
  };

  const adjustHead = countHead => {
    const queryObject = disassembleFactory();
    queryObject.headcount = countHead;
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const adjustSearch = searchContent => {
    const queryObject = disassembleFactory();
    queryObject.search = searchContent;
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const adjustCountry = selectedCountry => {
    const queryObject = disassembleFactory();
    queryObject.country = selectedCountry;
    queryObject.city = '';
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const adjustCity = selectedCity => {
    const queryObject = disassembleFactory();
    if (selectedCity === '국내전체') {
      queryObject.country = '한국';
      queryObject.city = '';
      const assembleQuery = assembleFactory(queryObject);
      navigate(`?${assembleQuery}`);
    } else {
      queryObject.country = '한국';
      queryObject.city = selectedCity;
      const assembleQuery = assembleFactory(queryObject);
      navigate(`?${assembleQuery}`);
    }
  };

  const adjustDate = (start, end) => {
    const queryObject = disassembleFactory();
    if (end === null) {
      alert('최소 1박 이상 선택해주세요');
    } else {
      queryObject['check-in'] = start.toISOString().substr(0, 10);
      queryObject['check-out'] = end.toISOString().substr(0, 10);
      const assembleQuery = assembleFactory(queryObject);
      navigate(`?${assembleQuery}`);
    }
  };

  const adjustPrice = priceRange => {
    const queryObject = disassembleFactory();
    queryObject['min-price'] = priceRange['min-price'];
    queryObject['max-price'] = priceRange['max-price'];
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const adjustTheme = themes => {
    if (!(themes[0] === '전체선택')) {
      const queryObject = disassembleFactory();
      queryObject.special = [];
      themes.forEach(theme => queryObject.special.push(theme));
      const assembleQuery = assembleFactory(queryObject);
      navigate(`?${assembleQuery}`);
    } else {
      const queryObject = disassembleFactory();
      queryObject.special = [];
      const assembleQuery = assembleFactory(queryObject);
      navigate(`?${assembleQuery}`);
    }
  };

  const movePage = page => {
    const queryObject = disassembleFactory();
    queryObject.offset = (page - 1) * 10;
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const sort = sortType => {
    const queryObject = disassembleFactory();
    queryObject['order-by'] = sortType;
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  const reset = () => {
    let queryObject = disassembleFactory();
    queryObject = {};
    const assembleQuery = assembleFactory(queryObject);
    navigate(`?${assembleQuery}`);
  };

  useEffect(() => {
    fetch(API.GET_BUILDINGS + LOCATION_SEARCH)
      .then(res => res.json())
      .then(res => {
        setSpaceList(res.RESULT.buildings);

        const number = Math.ceil(res.RESULT.count / 10);
        const tempArr = [];
        for (let i = 1; i <= number; i++) {
          tempArr.push(i);
        }
        setPages([...tempArr]);
      });
  }, [LOCATION_SEARCH]);

  useEffect(() => {
    fetch(API.GET_SPECIALS)
      .then(res => res.json())
      .then(res => setThemeList(res.RESULT));
  }, []);

  return (
    <Div>
      <Wrapper>
        <Title>FIND WORK</Title>
        <SubTitle>존재하는 것 자체로 일이 되는 공간</SubTitle>
      </Wrapper>
      <Filter
        themeList={themeList}
        adjustHead={adjustHead}
        adjustSearch={adjustSearch}
        adjustCountry={adjustCountry}
        adjustCity={adjustCity}
        adjustDate={adjustDate}
        adjustPrice={adjustPrice}
        adjustTheme={adjustTheme}
        reset={reset}
      />
      <SpaceList spaceList={spaceList} sort={sort} />
      <ButtonWrapper>
        {pages.map(page => (
          <ListButton key={page} page={page} movePage={movePage} />
        ))}
      </ButtonWrapper>
    </Div>
  );
}

const Div = styled.div`
  width: 1290px;
  height: 136px;
  margin: 0 auto;
  padding: 70px 20px 0 20px;
`;

const Title = styled.div`
  font-size: 18px;
  letter-spacing: 14px;
  font-weight: bold;
  color: #000;
  text-indent: 14px;
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: #000;
  font-weight: 500;
  line-height: 28px;
  margin: 10px 0 0;
`;

const Wrapper = styled.div`
  height: 136px;
  text-align: center;
  padding: 70px 20px 0 20px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default ListPage;
