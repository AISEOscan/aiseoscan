import '../styles/globals.css';
import { HelmetProvider } from 'react-helmet-async';
import GoogleAnalytics from '../components/GoogleAnalytics';

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </HelmetProvider>
  );
}

export default MyApp;