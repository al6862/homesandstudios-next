import React, { useState, useEffect } from 'react';
import theme from '@/styles/theme';
import Link from 'next/link';
import HeaderItem from '@/components/Header/HeaderItem';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import SvgLogo from '@/components/SvgLogo';

export default function MiddleBar({ bridgeLink, isActive }) {
  const router = useRouter();
  const [isIndexActive, setIsIndexActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (router.query.tp === 'search') {
      setIsSearchActive(true);
      setIsIndexActive(false);
    }
    if (router.asPath === '/') {
      setIsSearchActive(false);
      setIsIndexActive(true);
    }
  }, [router]);

  return (
    <>
      <div
        className={clsx('middle-bar f-h-center', {
          'is-show': isActive,
        })}
      >
        <div className="middle-bar-logo">
          <SvgLogo />
        </div>
        <div className="nav-header">
          <div className="nav-item">
            <HeaderItem
              title="m-index m-type"
              isActive={isIndexActive}
              textColor="var(--cr-black)"
              linkPath="/"
            >
              Index
            </HeaderItem>
          </div>
          <div className="nav-item">
            <Link href={bridgeLink}>
              <a className="bridge-link">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 1v19M1 10.5h19" stroke="var(--cr-black)" />
                </svg>
              </a>
            </Link>
          </div>
          <div className="nav-item">
            <HeaderItem
              title="m-search m-type"
              isActive={isSearchActive}
              textColor="var(--cr-black)"
              linkPath="/?tp=search"
            >
              search
            </HeaderItem>
          </div>
        </div>
      </div>
      <style jsx>{`
        .nav-header {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          height: calc(100% - var(--s-36));
        }

        .middle-bar-logo {
          width: 234px;
          height: 21px;
          transform: rotate(90deg);
          :global(.svg-logo) {
            width: inherit;
          }
        }
        .middle-bar {
          background: var(--cr-yellow);
          width: var(--middle-bar-width);
          z-index: 101;
          justify-content: center;
        }

        .bridge-link {
          display: block;
        }
        @media screen and (max-width: ${theme.mediaMedium}px) {
          .middle-bar {
            position: fixed;
            left: calc(100vw - var(--middle-bar-width));
            top: 0;
            bottom: 0;
          }
          .title {
            display: none;
          }
          .middle-bar-logo {
            display: none;
          }
          .nav-header {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
