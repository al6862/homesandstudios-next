import React, { useState, useEffect, useContext, useRef } from 'react';
import { executeScroll } from '@/utils';
import ImageContainer from '@/components/ImageContainer';
import ImageCourtesy from '@/components/ImageCourtesy';
import ContactBar from '@/components/ContactBar';
import Header from '@/components/Header';
import HeaderItem from '@/components/Header/HeaderItem';
import ContributeForm from '@/containers/pages/info/Form';
import { useRouter } from 'next/router';
import HeadMeta from '@/components/HeadMeta';
import theme from '@/styles/theme';
import MiddleBar from '@/components/MiddleBar';
import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import SvgLogo from '@/components/SvgLogo';
import { usePreviewSubscription } from '@/lib/sanity';
import { getClient } from '@/lib/sanity.server';
import { groq } from 'next-sanity';

const backgroundImage = 'rgba(64, 128, 255, 1)';
const pageQuery = groq`*[_type == "infoPage"][0]`;

function InfoPage(props) {
  const { pageData, siteConfigData, preview } = props;
  const router = useRouter();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMediaMedium, setIsMediaMedium] = useState(false);
  const windows = useMediaQuery(0);

  const onClcikOpenForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    setIsMediaMedium(windows.width < theme.mediaMedium ? true : false);
  }, [windows.width]);

  const configData = siteConfigData && siteConfigData;
  const pageRef = useRef(null);

  useEffect(() => {
    executeScroll(pageRef);
  }, [router]);

  if (!router.isFallback && !pageData) {
    return <Error statusCode={404} />;
  }

  const { data: infoPageData } = usePreviewSubscription(pageQuery, {
    initialData: pageData,
    enabled: preview || router.query.preview !== null,
  });

  return (
    <>
      {isMediaMedium && <MiddleBar bridgeLink={'/'} isActive={true} />}
      <div ref={pageRef} className="info-page">
        <Header background={backgroundImage} textColor="var(--cr-black)">
          <HeaderItem
            title="explore"
            isActive={false}
            textColor="var(--cr-black)"
            linkPath="/"
          >
            explore
          </HeaderItem>
          <HeaderItem
            title="info"
            isActive={true}
            textColor="var(--cr-black)"
            linkPath="/info"
          >
            info
          </HeaderItem>
        </Header>
        <div className="info-content">
          <div className="sec-title">
            <SvgLogo />
            <p className="desc1 t-b-1">
              Is an archive of artists’ homes and studios around the world.{' '}
            </p>
          </div>
          <div className="sec-1">
            <div className="sec-content">
              <ImageContainer
                source="/static/image/4-Barbara_Hepworth_Exterior_Museum_st-ives_PhotoC_Bent-Szameitat-350x460.jpg"
                width={isMediaMedium ? '65%' : '50%'}
                align="left"
              />
              <p className="desc1">
                It’s a collective effort with contributions from friends, and we
                welcome and appreciate any contributions to the list as we
                continue to update it.
              </p>

              {!infoPageData.showContributeButton && (
                <button
                  className="btn cta t-l-1 contribute"
                  onClick={onClcikOpenForm}
                >
                  CONTRIBUTE
                </button>
              )}
            </div>
          </div>
          <div className="sec-2">
            <div className="sec-content">
              {isFormOpen ? (
                <ContributeForm
                  emailServiceID={infoPageData.serviceID}
                  emailTemplateID={infoPageData.templateID}
                  emailUserID={infoPageData.userID}
                  emailSuccessMessage={infoPageData.contributeSuccessMessage}
                />
              ) : (
                <>
                  <p className="t-h-4">
                    There are many ways of learning and traveling. We found that
                    we navigated towards destinations where we gain insight into
                    our own time by transcending ourselves and experiencing
                    other people’s lives in different times in history.
                  </p>
                  <ImageContainer
                    source="/static/image/5146daed-da98-41a1-91f8-52796d7b5f76_original.jpg"
                    width="50%"
                    align="right"
                    caption="Raymond Lowey"
                  />
                  <div className="intro-image intro-m-2">
                    <p className="t-h-4">
                      Whether it’s Georgia O’Keffee’s home and studio in the
                      desert in New Mexico,
                    </p>
                    <Link href={'/explore/georgia-o-keeffe-home-and-studio'}>
                      <a className="image-link">
                        <ImageContainer
                          source="/static/image/georgia-o-keeffe-ghost-ranch-taos-10.jpg"
                          width="30%"
                          caption="Georgia O’Keffee"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="intro-image intro-m-3">
                    <p className="t-h-4">
                      the Eames’s modernistic home in the hilly sides of LA
                    </p>
                    <Link href={'/explore/charles-and-ray-eames'}>
                      <a className="image-link">
                        <ImageContainer
                          source="/static/image/Eames_3.jpg"
                          width="50%"
                          caption={`Charles & Ray Eames`}
                          align="right"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="intro-image intro-m-4">
                    <p className="t-h-4">
                      or Philip Johnson’s The Glasshouse in Connecticut,
                    </p>
                    <ImageContainer
                      source="/static/image/mccabe-05-warhol-2.jpg"
                      width="50%"
                      caption="Philip Johnson"
                    />
                  </div>
                  <p className="t-h-4">
                    we learn from the places we visit. We are fascinated by
                    their life work, the aesthetics and details of their places,
                    the philosophy they lived by and the conversations we
                    imagined they had with like-minded artists and friends.
                  </p>
                  {infoPageData.imageCourtesy.length > 0 && (
                    <ImageCourtesy mainData={infoPageData.imageCourtesy} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {!isFormOpen && (
          <>
            <div className="bottom-caption sec-content">
              <h4 className="t-h-4">
                “I HAVEN’T BEEN EVERYWHERE, BUT IT’S ON MY LIST.” - SUSAN SONTAG
              </h4>
            </div>
            <ContactBar mainData={siteConfigData} textColor="var(--cr-black)" />
          </>
        )}
      </div>
      <style jsx>{`
        .info-page {
          position: relative;
          background: ${backgroundImage};
          .t-h-4 {
            text-transform: uppercase;
          }
        }
        .sec-title {
          padding-right: var(--s-20);
          padding-left: var(--s-20);
          :global(.svg-logo) {
            max-width: 375px;
            margin: var(--s-12) 0 0;
          }
        }

        .desc1 {
          margin: 0;
        }
        .sec-1 {
          padding-top: var(--s-14);
          padding-bottom: var(--s-30);

          .desc1 {
            max-width: 357px;
            margin: var(--s-30) 0 0;
          }
          .btn {
            margin: var(--s-30) 0 0;
          }
        }
        .sec-2 {
          border-top: 1px solid var(--cr-black);
        }
        .sec-content {
          padding-right: var(--s-20);
          padding-left: var(--s-20);
        }
        .intro-image {
          position: relative;
          margin: var(--s-30) 0;
          p {
            position: relative;
            margin: 0;
            max-width: 80%;
          }
        }
        .intro-m-2 {
          :global(.image-container) {
            margin: -30px auto 0 25%;
          }
        }
        .intro-m-4 {
          :global(.image-container) {
            margin: -12px 60px 0 auto;
          }
        }
        .bottom-caption {
          border-top: 1px solid var(--cr-black);
        }
        .cta {
          background: transparent;
        }
        @media screen and (max-width: ${theme.mediaMedium}px) {
          :global(.header) {
            display: none !important;
          }
          .info-page {
            width: calc(100% - var(--middle-bar-width));
            float: right;
            .desc1 {
              margin: 0;
            }
          }
          .sec-title {
            padding-top: var(--s-24);
            padding-bottom: var(--s-24);
            border-bottom: 1.3px solid var(--cr-black);
            :global(.svg-logo) {
              margin: 0;
            }
          }
        }
        @media screen and (max-width: ${theme.mediaMedium}px) {
          .sec-title {
            padding: var(--s-24) var(--s-14);
          }
          .sec-content {
            padding-right: var(--s-14);
            padding-left: var(--s-14);
          }
          :global(.middle-bar) {
            left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params = {}, preview = false }) {
  const pageData = await getClient(preview).fetch(pageQuery);

  return {
    props: {
      preview,
      pageData,
    },
    revalidate: 30,
  };
}

export default InfoPage;
