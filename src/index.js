import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
// const { Kakao } = window;
// Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
