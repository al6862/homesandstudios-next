import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import HeaderItem from '@/components/Header/HeaderItem';
import ImageCourtesy from '@/components/ImageCourtesy';
import { useRouter } from 'next/router';
import ContactBar from '@/components/ContactBar';
import { imageBuilder } from '@/lib/sanity';
import ImageContainer from '@/components/ImageContainer';
import Link from 'next/link';
import HeadMeta from '@/components/HeadMeta';
import { executeScroll } from '@/utils';

function HomePage(props) {
  const { mainData, siteData } = props;

  const router = useRouter();
  const pageRef = useRef(null);
  useEffect(() => {
    executeScroll(pageRef);
  }, [router]);

  return (
    <>
      <div ref={pageRef} className="home-page">
        <Header background="var(--cr-black)" textColor="var(--cr-white)">
          <HeaderItem
            title="explore"
            isActive={true}
            textColor="var(--cr-white)"
            linkPath="/"
          >
            explore
          </HeaderItem>
          <HeaderItem
            title="info"
            isActive={false}
            textColor="var(--cr-white)"
            linkPath="/info"
          >
            info
          </HeaderItem>
        </Header>
        <div className="content">
          <div className="gallery">
            {mainData &&
              mainData.homeGallery.map((item, index) => {
                return (
                  <div className="gallery-item" key={index}>
                    {item.linkToPage ? (
                      <Link href={`/explore/${item.linkToPage.slug.current}`}>
                        <a className="image-link">
                          <ImageContainer
                            source={imageBuilder(item.image.asset._ref).url()}
                            caption={
                              <pre className="t-b-2">{item.caption}</pre>
                            }
                            alt={item.alt}
                          />
                        </a>
                      </Link>
                    ) : (
                      <ImageContainer
                        source={imageBuilder(item.image.asset._ref).url()}
                        caption={<pre className="t-b-3">{item.caption}</pre>}
                        alt={item.alt}
                      />
                    )}
                  </div>
                );
              })}
          </div>
          {mainData && mainData.imageCourtesy && (
            <div className="bottom">
              <ImageCourtesy
                mainData={mainData.imageCourtesy}
                color="var(--cr-white)"
              />
            </div>
          )}
        </div>
        <ContactBar mainData={siteData} textColor="var(--cr-white)" />
      </div>
      <style jsx>{`
        .home-page {
          min-height: 100vh;
          background: var(--cr-black);
        }
        .content {
          margin: 0 var(--s-20);
        }

        .gallery-item {
          margin: var(--s-12) 0;
          width: 52%;
          margin-bottom: 170px;
          pre {
            margin: 0;
            line-height: 1.5;
          }
          &:nth-child(even) {
            margin-left: auto;
            margin-top: var(--s-60);
          }
          &:nth-child(3) {
            width: 45%;
          }
          &:nth-child(4) {
            width: 58%;
            margin-right: 60px;
          }
          &:nth-child(5) {
            margin-left: 30px;
          }
        }
        :global(.image-courtesy) {
          :global(p) {
            color: var(--cr-white);
          }
        }

        :global(.image-container) {
          :global(figcaption) {
            transition: opacity 0.3s;
            opacity: 0;
            color: var(--cr-white);
          }
          &:hover {
            :global(figcaption) {
              opacity: 1;
              color: var(--cr-white);
            }
          }
        }
        .bottom {
          padding-bottom: var(--s-30);
        }
      `}</style>
    </>
  );
}

export default HomePage;
