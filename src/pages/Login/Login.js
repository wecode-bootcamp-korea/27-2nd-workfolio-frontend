// import React from 'react';
// import styled from 'styled-components';
// import { API } from '../../config';
// import { useNavigate } from 'react-router-dom';
// const { Kakao } = window;

// function Login() {
//   const navigate = useNavigate();
//   const kakaoLoginClickHandler = () => {
//     Kakao.Auth.loginForm({
//       success: function (authObj) {
//         fetch(`${API.USER}`, {
//           method: 'POST',
//           headers: {
//             Authorization: authObj.access_token,
//           },
//         })
//           .then(res => res.json())
//           .then(res => {
//             sessionStorage.setItem('token', res.access_token);
//             if (res.access_token) {
//               alert('WorkFolio에 오신 걸 환영합니다!');
//               navigate('/');
//             } else {
//               alert('이미 로그인 되어 있습니다.');
//               navigate({ pathname: '/' });
//             }
//           });
//       },
//       fail: function (err) {
//         alert(JSON.stringify(err));
//       },
//     });
//   };

//   return (
//     <>
//       <Container>
//         <SubTitle />
//         <Title>LOGIN</Title>
//         <Text>로그인</Text>
//       </Container>
//       <Container>
//         <LoginWrap />
//         <Text>
//           WorkFolio에 오신 것을 환영합니다! <br />
//         </Text>
//         <Button type="button" onClick={kakaoLoginClickHandler}>
//           <KakaoImg
//             src="https://www.nicepng.com/png/full/388-3888984_open-png.png"
//             alt="카카오이미지"
//           />
//           카카오톡으로 로그인하기
//         </Button>
//       </Container>
//     </>
//   );
// }

// export default Login;

// const Container = styled.div`
//   background-color: ${({ theme }) => theme.background};
//   margin: ${({ theme }) => theme.marginCenter};
//   text-align: center;
// `;

// const SubTitle = styled.div`
//   width: 100%;
//   height: 206px;
//   text-align: center;
//   padding-top: 70px;
// `;

// const Title = styled.div`
//   font-size: 18px;
//   letter-spacing: 14px;
//   text-indent: 14px;
//   color: ${({ theme }) => theme.colorBlack};
//   font-weight: ${({ theme }) => theme.weightBold};
// `;

// const Text = styled.div`
//   font-size: 15px;
//   color: ${({ theme }) => theme.colorBlack};
//   font-weight: ${({ theme }) => theme.weightSemiBold};
//   line-height: 28px;
//   margin: 10px 0 0;
// `;

// const Button = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 360px;
//   background-color: #f5de04;
//   padding: 8px 0;
//   margin: 40px auto 0;
//   cursor: pointer;
// `;

// const KakaoImg = styled.img`
//   width: 28px;
//   text-align: left;
//   display: block;
//   margin-right: 10px;
// `;

// const LoginWrap = styled.div`
//   width: 360px;
//   margin: 80px auto 0;
//   border-top: 1px solid #000;
// `;
