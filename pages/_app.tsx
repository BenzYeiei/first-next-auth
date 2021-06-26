// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
// import type { AppProps , AppContext  } from 'next/app'
import Head from 'next/head';

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../components/systems/theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <>
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/anatomy.png" />
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </>
  ) 
}

// **** setting from material-ui server side generation
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

// wrapper.withRedux(MyApp);

export default MyApp;