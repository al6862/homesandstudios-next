import Home from '@/containers/pages/HomePage';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '@/lib/sanity';
import { getClient } from '@/lib/sanity.server';
import { groq } from 'next-sanity';

const homePageDataQuery = groq`*[_type == "home-page"][0]{
  ...,
  homeGallery[]{
    ...,
    linkToPage{
    ...,
	   _type == "reference" => {
    	...,
	    "slug": @-> slug 
		 }
	  }
  },
}`;

function IndexPage(props) {
  const { pageData, siteConfigData, preview } = props;

  const router = useRouter();

  if (!router.isFallback && !pageData) {
    return <Error statusCode={404} />;
  }
  const { data: homePageData } = usePreviewSubscription(homePageDataQuery, {
    initialData: pageData,
    enabled: preview || router.query.preview !== null,
  });

  return <Home mainData={homePageData} siteData={siteConfigData} />;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const pageData = await getClient(preview).fetch(homePageDataQuery);

  return {
    props: {
      preview,
      pageData,
    },
    revalidate: 30,
  };
}

export default IndexPage;
