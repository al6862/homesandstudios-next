import React, { useEffect, useState, useRef } from 'react';
import Error from 'next/error';
import { usePreviewSubscription } from '@/lib/sanity';
import { getClient } from '@/lib/sanity.server';
import { groq } from 'next-sanity';
import IconSvg from '@/components/IconSvg';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import { useRouter } from 'next/router';
import ImageCourtesy from '@/components/ImageCourtesy';
import theme from '@/styles/theme';
import HeadMeta from '@/components/HeadMeta';
import { executeScroll } from '@/utils';
import PortableText from '@/components/PortableText';

const postQuery = groq`*[_type == "architecture" && slug.current == $slug][0]`;

function ExploreDetail({ pageData, preview }) {
  const router = useRouter();
  const [postData, setPostData] = useState(pageData);
  const [transitionStage, setTransitionStage] = useState('fade-out');

  if (!router.isFallback && !pageData?.slug) {
    return <Error statusCode={404} />;
  }

  const { data: exploreData = {} } = usePreviewSubscription(postQuery, {
    params: { slug: postData?.slug?.current },
    initialData: postData,
    enabled: preview || router.query.preview !== null,
  });

  const pageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      executeScroll(pageRef);
    }, 500);
  }, [router]);

  useEffect(() => {
    setTransitionStage('fade-in');
  }, []);

  useEffect(() => {
    if (pageData !== postData) {
      setTransitionStage('fade-out');
      setTimeout(() => {
        setPostData(pageData);
      }, 300);
    }
  }, [pageData]);

  const handleClickClose = (e) => {
    e.preventDefault();
    if (router.query.tp === 'search') router.push('/?tp=search');
    else {
      router.push('/');
    }
  };

  const {
    title,
    visitLink,
    author,
    address,
    gallery,
    section2,
    imageCourtesy,
    footerButton,
    descriptionProt,
    descriptionProt2,
  } = exploreData;

  return (
    <>
      <div ref={pageRef} className="explore-detail">
        <Header background="var(--cr-black)" textColor="var(--cr-white)">
          <button className="btn close f-h-center" onClick={handleClickClose}>
            <IconSvg
              type="closeX"
              fill="none"
              stroke="var(--cr-white)"
              strokeWidth={1.5}
              width={23}
              height={23}
              viewBox={'0 0 26 26'}
            />
          </button>
          {visitLink && (
            <a
              className="btn t-l-1 cta visit"
              href={visitLink}
              target="_blank"
              rel="noreferrer"
            >
              VISIT
            </a>
          )}
        </Header>
        <div
          onTransitionEnd={() => {
            if (transitionStage === 'fade-out') {
              setTimeout(() => {
                setTransitionStage('fade-in');
              }, 600);
            }
          }}
          className={`content ${transitionStage}`}
        >
          {postData && (
            <>
              <section className="sec-1">
                <h1 className="t-h-1 title">{title}</h1>
                <ul className="list">
                  <li>
                    <span className="t-b-1">{author}</span>
                  </li>
                  <li>
                    <pre className="t-b-1">{address}</pre>
                  </li>
                </ul>
                {descriptionProt && (
                  <div className="portable-text description-1">
                    <PortableText blocks={descriptionProt} />
                  </div>
                )}
                {gallery && gallery.length > 0 && (
                  <Carousel
                    cols={1}
                    gap={10}
                    slidesData={gallery}
                    isShowNav={true}
                  />
                )}
                {descriptionProt2 && (
                  <div className="portable-text description-2">
                    <PortableText blocks={descriptionProt2} />
                  </div>
                )}
              </section>

              <section className="sec-2">
                {section2 && (
                  <div className="portable-text">
                    <PortableText blocks={section2} />
                  </div>
                )}
                <div className="footer-container">
                  {imageCourtesy && <ImageCourtesy mainData={imageCourtesy} />}
                  {footerButton && (
                    <a
                      className="btn cta t-l-1"
                      href={footerButton.url}
                      data-type={footerButton.linkText}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {footerButton.linkText}
                    </a>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        :global(.image-group) {
          display: flex;
          justify-content: space-between;
          margin: 0 0 var(--s-16);
          :global(img) {
            width: 48%;
          }
        }

        .portable-text {
          :global(a) {
            text-decoration: underline;
          }
          :global([class*='heading']) {
            font-size: 30px;
            line-height: 1.5;
          }
        }

        .explore-detail {
          background-color: var(--cr-black);
          overflow: hidden;
          .cta.visit {
            color: var(--cr-white);
            text-transform: uppercase;
          }
          .btn.close {
            width: 23px;
            height: 23px;
            background: inherit;
          }
        }

        .content {
          opacity: 0;
          transition: opacity 600ms ease;
          width: 100%;
        }

        .fade-in {
          opacity: 1;
        }

        .list {
          padding-left: 0;
          margin: var(--s-30) 0;
          li {
            list-style: none;
            display: flex;
            pre {
              margin: 0;
              white-space: pre-wrap;
            }
            &:before {
              content: '•';
              font-size: var(--s-24);
              vertical-align: middle;
              line-height: 20px;
              padding-right: var(--s-20);
              display: inline-block;
            }
            &:first-child {
              padding-bottom: var(--s-10);
            }
          }
        }

        .sec-1 {
          background: var(--cr-black);
          color: var(--cr-white);
          min-height: calc(100% - var(--header-height));
          padding: var(--s-14) var(--s-20) var(--s-30) var(--s-20);
          .title {
            margin: 0;
          }
          .portable-text {
            :global(a) {
              color: var(--cr-red);
            }
          }

          .description-1 {
            max-width: 70%;
          }
        }
        .sec-2 {
          padding: var(--s-20) var(--s-20) 0 var(--s-20);
          background: rgba(239, 51, 64, 1);
        }

        .block-content {
          :global(img) {
            max-width: 100%;
          }
          :global(h1, h2, h3, h4, h5, h6) {
            font-family: 'SuisseNeueTrial-Light', Helvetica, sans-serif;
            font-weight: 100;
            line-height: 1.3;
            letter-spacing: 0.3px;
            margin: var(--s-30) 0;
          }
        }

        .footer-container {
          padding: var(--s-20) 0;
          .cta {
            text-transform: uppercase;
          }
        }
        @media screen and (max-width: ${theme.mediaSmall}px) {
          .sec-1 {
            .portable-text {
              max-width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const pageData = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      pageData,
    },
    revalidate: 3,
  };
}

export async function getStaticPaths() {
  const query = groq`*[_type == "architecture" && defined(slug.current)][].slug.current`;
  const allPaths = await getClient().fetch(query);

  return {
    paths: allPaths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
export default ExploreDetail;
