import "bootstrap/dist/css/bootstrap.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import buildClient from "../api/buildClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D3FD3', // A purple color based on the screenshots
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure Bootstrap JS works correctly
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>TicketSeller - Find and sell tickets for your favorite events</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Buy and sell tickets for concerts, sports, theater, and more" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="d-flex flex-column min-vh-100">
      <Header currentUser={currentUser} />
        <main className="flex-grow-1">
        <Component currentUser={currentUser} {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let data;
  
  try {
    const response = await client.get("/api/users/currentuser");
    data = response.data;
  } catch (err) {
    data = { currentUser: null };
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
