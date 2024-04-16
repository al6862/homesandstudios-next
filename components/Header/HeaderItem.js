import Link from 'next/link';

export default function HeaderItem(props) {
  const { title, textColor, isActive, linkPath } = props;
  const link = linkPath ? linkPath : '/';
  const backgroundColor = isActive ? textColor : 'transparent';
  return (
    <>
      <span className={`header-item t-h-3 ${title}`}>
        <Link href={link}>
          <a className="item-link f-h-center" hidefocus="hidefocus">
            <span className="dot" />
            <span className="item-content t-h-3">{props.children}</span>
          </a>
        </Link>
      </span>
      <style jsx>{`
        .header-item {
          color: ${textColor};
          text-transform: uppercase;

          .dot {
            height: 25px;
            width: 25px;
            background-color: ${backgroundColor};
            border: 1.3px solid ${textColor};
            border-radius: 50%;
            display: inline-block;
            margin-right: var(--s-6);
          }
          .item-link {
            flex-wrap: nowrap;
            transition: opacity 0.3s;
          }
          .item-content {
            padding-top: 5px;
          }
        }
        .m-type {
          writing-mode: vertical-rl;
          .dot {
            margin-right: 0;
            margin-bottom: var(--s-12);
          }
          .item-content {
            padding-top: 0;
            padding-right: 5px;
          }
        }
        .m-search {
          transform: rotate(180deg);
        }
        @media (hover: hover) {
          .item-link {
            &:hover {
              opacity: 0.6;
            }
          }
        }
      `}</style>
    </>
  );
}
