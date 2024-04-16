import React from 'react';
import '@/styles/index.scss';
import Layout from '@/layout';
import { DataProvider } from '@/context';
import { getNavListData, getSiteConfigData } from '@/lib/api';
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout
        navListData={pageProps.navListData}
        siteConfigData={pageProps.siteConfigData}
        pageData={pageProps.pageData}
      >
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Add site config from sanity
  const navListData = await getNavListData();
  const siteConfigData = await getSiteConfigData();

  return {
    pageProps: {
      ...(navListData && { navListData }),
      ...(siteConfigData && { siteConfigData }),
    },
  };
};

export default MyApp;
