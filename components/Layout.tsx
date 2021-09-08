import Head from 'next/head';
import { Container } from 'react-bootstrap';

import styles from '../styles/Layout.module.css';
import { Footer } from './Footer';
import { Header } from './Header/Header';

type LayoutProps = {
  className?: string;
  title?: string;
  keywords?: string;
  description?: string;
  children?: JSX.Element;
};

const Layout = ({
  className = '',
  title = 'Lang',
  keywords = 'lang, mang',
  description = 'study severely',
  children
}: LayoutProps) => {
  return (
    <div className={className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <Container className={styles.container}>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
