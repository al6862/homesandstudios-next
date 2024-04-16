import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const Body = (props) => {
  const router = useRouter();
  const isBodyShow = router.pathname !== '/' ? true : false;

  return (
    <>
      <main
        id="main"
        role="main"
        className={clsx('main', {
          'mb-show': isBodyShow,
        })}
      >
        <div className="container">{props.children}</div>
      </main>
      <style jsx global>{`
        .main {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow-y: scroll;
        }
        .container {
          height: 100%;
        }
        @media screen and (max-width: ${theme.mediaMedium}px) {
          .main {
            transform: translateX(100%);
            transition: transform 300ms;
            visibility: hidden;
            &.mb-show {
              height: 100%;
              visibility: visible;
              position: fixed;
              transform: none;
              overflow-y: scroll;
            }
          }
        }
      `}</style>
    </>
  );
};

export default Body;
