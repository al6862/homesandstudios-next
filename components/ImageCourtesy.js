import clsx from 'clsx';
import theme from '@/styles/theme';

const ImageCourtesy = ({ mainData, color }) => {
  const titleColor = color ? color : 'var(--cr-black)';
  const isItemInCol = mainData.length > 2 ? false : true;

  return (
    <>
      <div
        className={clsx('image-courtesy', {
          'in-col': isItemInCol,
        })}
      >
        <span className="title t-b-2">Images courtesy of:</span>
        {mainData.map((item, index) => {
          return item.url ? (
            <a
              key={index + item.title}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="img-c-t t-b-2 list-item"
            >
              {item.title}
            </a>
          ) : (
            <span key={index + item.title} className="img-c-t t-b-2 list-item">
              {item.title}
            </span>
          );
        })}
      </div>
      <style jsx>{`
        .image-courtesy {
          margin-bottom: var(--s-30);
          display: flex;
          justify-content: flex-start;
          width: 50%;
          flex-wrap: wrap;
          &.in-col {
            .title {
              padding-bottom: var(--s-4);
            }
            .list-item {
              flex: 100%;
            }
          }
          .title {
            flex: none;
            color: ${titleColor};
            padding-right: var(--s-4);
          }

          .list-item {
            flex: 0 1 auto;
            padding-bottom: var(--s-4);
            padding-right: var(--s-4);
            &:not(:last-child):after {
              content: ',';
              display: inline-block;
              color: var(--cr-white);
            }
          }
          a {
            text-decoration: underline;
          }

          .img-c-t {
            color: rgb(252, 247, 111);
          }
        }
        @media screen and (max-width: ${theme.mediaLarge}px) {
          .image-courtesy {
            width: 60%;
          }
        }
        @media screen and (max-width: ${theme.mediaMedium}px) {
          .image-courtesy {
            width: 34%;
          }
        }
        @media screen and (max-width: ${theme.mediaSmall}px) {
          .image-courtesy {
            width: 50%;
          }
        }
      `}</style>
    </>
  );
};

export default ImageCourtesy;
