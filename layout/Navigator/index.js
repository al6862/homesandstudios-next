import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MiddleBar from '@/components/MiddleBar';
import Header from '@/components/Header';
import HeaderItem from '@/components/Header/HeaderItem';
import NavigatorItem from './NavigatorItem';
import NavigatorSearchItem from './NavigatorSearchItem';
import theme from '@/styles/theme';
import clsx from 'clsx';
import { getClient } from '@/lib/sanity.server';
import { navListQuery } from '@/lib/api';
import SvgLogo from '@/components/SvgLogo';

function Navigator({ navList }) {
  const router = useRouter();
  const isSearchActive = router.query.tp === 'search' ? true : false;
  const isNavShow = router.pathname === '/' ? true : false;
  const [mainData, setMainData] = useState();
  const [searchData, setSearchData] = useState();
  const [activeSearchItem, setActiveSearchItem] = useState('');

  const getMainData = async () => {
    const mainData = await getClient().fetch(navListQuery);
    setMainData(mainData);
    getSearchData(mainData, 'location');
  };

  const getSearchData = (array, key) => {
    const groupByKey = (array, key) =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key].includes(',')
          ? obj[key].split(',')[1]
          : obj[key];

        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const groupData = Object.entries(groupByKey(array, key)).map(
      ([key, value]) => ({ title: key, list: value })
    );

    setSearchData(groupData);
  };

  useEffect(() => {
    if (navList) {
      setMainData(navList);
      getSearchData(navList, 'location');
    }
  }, [navList]);

  const openSearchListItem = (type) => {
    if (type === activeSearchItem) {
      setActiveSearchItem('');
    } else {
      setActiveSearchItem(type);
    }
  };

  return (
    <>
      <div
        className={clsx('navigation', {
          'mb-show': isNavShow,
        })}
      >
        <div className="main-nav">
          <Header background="var(--cr-white)" textColor="var(--cr-black)">
            <HeaderItem
              title="index"
              isActive={!isSearchActive}
              textColor="var(--cr-black)"
              linkPath="/"
            >
              Index
            </HeaderItem>
            <HeaderItem
              title="search"
              isActive={isSearchActive}
              textColor="var(--cr-black)"
              linkPath="/?tp=search"
            >
              search
            </HeaderItem>
          </Header>

          <div className="m-heaer-logo">
            <SvgLogo />
            <p className="t-b-2 sub-title">
              Is an archive of artists’ homes and studios around the world.{' '}
            </p>
          </div>
          <div className="nav-list">
            {!isSearchActive &&
              mainData &&
              mainData.map((item) => (
                <NavigatorItem key={item._id} mainData={item} />
              ))}

            {isSearchActive &&
              searchData &&
              searchData.map((item, index) => (
                <NavigatorSearchItem
                  key={index}
                  searchData={item}
                  activeItem={activeSearchItem}
                  openItemList={openSearchListItem}
                />
              ))}
          </div>
        </div>
        <MiddleBar bridgeLink={'/info'} isActive={isNavShow} />
      </div>
      <style jsx>{`
        .navigation {
          position: relative;
          display: flex;
          background-color: var(--cr-white);
        }
        .main-nav {
          flex-direction: column;
          min-width: 56vw;
          height: 100vh;
          overflow-y: scroll;
        }

        .m-heaer-logo {
          display: none;
          padding: var(--s-20);
          max-width: 375px;
          .title,
          .sub-title {
            margin: 0;
          }
        }

        @media screen and (max-width: ${theme.mediaMedium}px) {
          .navigation {
            width: 100vw;
            transform: translatex(-100%);
            transition: transform 300ms;
            &.mb-show {
              transform: none;
              .main-nav {
                height: 100%;
                position: fixed;
              }
            }
            .main-nav {
              width: calc(100vw - var(--middle-bar-width));
            }
            :global(.header) {
              display: none;
            }
            .m-heaer-logo {
              display: block;
            }
          }
          .nav-list {
            border-top: 1.3px solid var(--cr-black);
          }
        }
        @media screen and (max-width: ${theme.mediaSmall}px) {
          .m-heaer-logo {
            padding: var(--s-20) var(--s-14);
          }
        }
        @media screen and (max-width: ${theme.mediaXsmall}px) {
          .m-heaer-logo {
            padding: var(--s-20) var(--s-12);
          }
        }
      `}</style>
    </>
  );
}

export default Navigator;
