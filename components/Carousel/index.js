import React, { useState, useCallback, useEffect } from 'react';
import theme from '@/styles/theme';
import useMediaQuery from '@/hooks/useMediaQuery';
import IconSvg from '@/components/IconSvg';
import SlideItem from './SlideItem';

const GalleryCarousel = (props) => {
  const { cols, gap, isShowNav, slidesData } = props;
  const arrowRatio = 0.685;
  const arrowWidth = 32;
  const arrowHeight = arrowWidth * arrowRatio;
  const page = Math.ceil(slidesData.length / cols);

  const [isMediaMedium, setIsMediaMedium] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [slidesData]);

  const handlePrev = useCallback(() => {
    setCurrentPage((current_page) => (current_page - 1 + page) % page);
  }, [slidesData]);

  const handleNext = useCallback(() => {
    setCurrentPage((current_page) => (current_page + 1 + page) % page);
  }, [slidesData]);

  const windows = useMediaQuery(0);

  useEffect(() => {
    setIsMediaMedium(windows.width < theme.mediaMedium ? true : false);
  }, [windows.width]);

  return (
    <>
      <div className="carousel-main">
        <div className="carousel-rail-wrapper">
          <div
            className="carousel-rail"
            style={{
              gridTemplateColumns: `repeat(${page}, 100%)`,
              left: `calc(${-100 * currentPage}% - ${gap * currentPage}px)`,
              gridColumnGap: `${gap}px`,
            }}
          >
            {slidesData
              ? slidesData.map((item, index) => (
                  <SlideItem
                    key={index}
                    cols={cols}
                    gap={gap}
                    itemData={item}
                    isCurrent={index === currentPage}
                  />
                ))
              : null}
          </div>
          {slidesData.length > 1 && (
            <div className="nv-section f-h">
              <div className="left" onClick={handlePrev}>
                {isMediaMedium && (
                  <IconSvg
                    type="ArrowRight"
                    fill="var(--cr-white)"
                    stroke="var(--cr-white)"
                    strokeWidth={1.5}
                    width={arrowWidth}
                    height={arrowHeight}
                    viewBox={'0 0 108 74'}
                  />
                )}
              </div>
              <div className="right" onClick={handleNext}>
                {isMediaMedium && (
                  <IconSvg
                    type="ArrowRight"
                    fill="var(--cr-white)"
                    stroke="var(--cr-white)"
                    strokeWidth={1.5}
                    width={arrowWidth}
                    height={arrowHeight}
                    viewBox={'0 0 108 74'}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {isShowNav && (
          <div className="slide-nav t-b-2">
            <span>{`${currentPage + 1}`.padStart(2, '0')}</span>
            <span className="slash">{'/'}</span>
            <span>{`${slidesData.length}`.padStart(2, '0')}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .carousel-main {
          position: relative;
        }
        .carousel-rail-wrapper {
          overflow: hidden;
          position: relative;
        }

        .carousel-rail {
          display: grid;
          position: relative;
          transition: left 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
        }
        .carousel-item {
          padding: 0;
        }
        .slide-nav {
          position: relative;
          display: flex;
          justify-content: flex-end;
          padding: var(--s-12) 0;
          .slash {
            padding: 0 var(--s-4);
          }
        }

        .nv-section {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          width: 100%;
          height: 90%;
          transform: translateY(-50%);
          opacity: 0;
          .left {
            width: 50%;
            cursor: url('/static/image/icon/arrow-left.png'), auto;
          }
          .right {
            width: 50%;
            cursor: url('/static/image/icon/arrow-right.svg'), auto;
          }
        }

        @media screen and (max-width: ${theme.mediaMedium}px) {
          .nv-section {
            opacity: 1;
            .left {
              position: absolute;
              left: 12px;
              width: ${arrowWidth}px;
              top: 50%;
              transform: translateY(-50%) rotate(180deg);
            }
            .right {
              position: absolute;
              right: 12px;
              width: ${arrowWidth}px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      `}</style>
    </>
  );
};

export default GalleryCarousel;
