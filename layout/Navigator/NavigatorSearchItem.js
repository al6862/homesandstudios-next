import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconSvg from '@/components/IconSvg';
import theme from '@/styles/theme';
import clsx from 'clsx';

function NavigatorSearchItem({ searchData, activeItem, openItemList }) {
  const router = useRouter();
  const { title, list } = searchData;

  const arrowRatio = 0.685;
  const arrowWidth = 32;
  const arrowHeight = arrowWidth * arrowRatio;

  const searchListEl = useRef();

  return (
    <>
      <div className="list-search-item">
        <div
          className={clsx('search-item-content', {
            open: activeItem === title,
          })}
        >
          <button className="t-h-1 title" onClick={() => openItemList(title)}>
            {title}
          </button>
          <div
            ref={searchListEl}
            className="search-item-list"
            style={
              activeItem === title && searchListEl.current
                ? { height: searchListEl.current.scrollHeight }
                : { height: '0px' }
            }
          >
            <div className="search-item-list-inner">
              {list &&
                list.map((item) => (
                  <div key={item._id} className="list-item">
                    <Link
                      href={`/explore/${encodeURIComponent(
                        item.slug.current
                      )}?tp=search`}
                    >
                      <a className="nav-link f-h">
                        <h4 className="t-h-4 f-h-center item-title">
                          {router.query.slug === item.slug.current && (
                            <IconSvg
                              type="ArrowRight"
                              fill="var(--cr-black)"
                              stroke="var(--cr-black)"
                              strokeWidth={1.5}
                              width={arrowWidth}
                              height={arrowHeight}
                              viewBox={'0 0 108 74'}
                              style={{ marginRight: '20px' }}
                            />
                          )}
                          {item.title}
                        </h4>
                        <h6 className="t-b-2 f-h-center location">
                          {item.location}
                        </h6>
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        h4,
        h6 {
          margin: 0;
          line-height: 100%;
        }
        .search-item-content {
          justify-content: space-between;
          .title {
            cursor: pointer;
            background: transparent;
            border: none;
            outline: none;
            padding: var(--s-16) var(--s-20);
            width: 100%;
            text-align: left;
            text-transform: uppercase;
          }
          .item-title {
            text-transform: uppercase;
          }
          &:last-child {
            border-bottom: 1.3px solid var(--cr-black);
          }
          &.open {
            height: auto;
            overflow: hidden;
            padding-bottom: var(--s-10);
          }
        }

        .search-item-list {
          transition: height 400ms ease 0s;
          height: 0;
          overflow: hidden;
          .nav-link {
            justify-content: space-between;
          }
        }

        .search-item-list-inner {
          padding: var(--s-20);
          .list-item {
            &:not(:last-child) {
              padding-bottom: var(--s-30);
            }
            .item-title {
              flex: 1;
            }
          }
        }

        @media screen and (max-width: ${theme.mediaMedium}px) {
          .search-item-list {
            .nav-link {
              .item-title {
                flex-basis: 100%;
                margin-bottom: var(--s-4);
              }
            }
          }
        }
        @media screen and (max-width: ${theme.mediaSmall}px) {
          .search-item-content {
            .title {
              padding: var(--s-20) var(--s-14);
            }
          }
        }
        @media screen and (max-width: ${theme.mediaXsmall}px) {
          .search-item-content {
            .title {
              font-size: 20px;
              padding: var(--s-20) var(--s-12);
            }
          }
        }
      `}</style>
    </>
  );
}

export default NavigatorSearchItem;
