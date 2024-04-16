import Link from 'next/link';
import { useRouter } from 'next/router';
import IconSvg from '@/components/IconSvg';
import theme from '@/styles/theme';

function NavigatorItem({ mainData }) {
  const router = useRouter();
  const arrowRatio = 0.685;
  const arrowWidth = 32;
  const arrowHeight = arrowWidth * arrowRatio;

  return (
    <>
      <div className="list-item">
        <Link href={`/explore/${encodeURIComponent(mainData.slug.current)}`}>
          <a className="nav-link f-h">
            <h4 className="t-h-4 f-h-center title">
              {router.query.slug === mainData.slug.current && (
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
              {mainData.title}
            </h4>
            <h6 className="t-b-2 f-h-center location">{mainData.location}</h6>
          </a>
        </Link>
      </div>

      <style jsx>{`
        h4,
        h6 {
          margin: 0;
          line-height: 100%;
        }
        .nav-link {
          justify-content: space-between;
          padding: var(--s-16) var(--s-20);
          transition: opacity 0.3s;
          &:last-child {
            border-bottom: 1.3px solid var(--cr-black);
          }
          &:hover {
            opacity: 0.6;
          }
          .title {
            text-transform: uppercase;
          }
        }

        @media screen and (max-width: ${theme.mediaLarge}px) {
          .nav-link {
            .title {
              flex-basis: 100%;
              margin-bottom: var(--s-12);
            }
          }
        }
        @media screen and (max-width: ${theme.mediaSmall}px) {
          .nav-link {
            padding: var(--s-10);
            .title {
              margin-bottom: var(--s-4);
            }
          }
          .location {
            font: var(--t-b-3);
            letter-spacing: 0.13px;
          }
        }
      `}</style>
    </>
  );
}

export default NavigatorItem;
