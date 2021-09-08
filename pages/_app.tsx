import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useStore } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
