const ContactBar = (props) => {
  const { mainData, textColor } = props;
  const siteConfig = mainData;
  const color = textColor ? textColor : 'var(--cr-white)';
  const instagramUrl =
    siteConfig && siteConfig.instagramUrl ? siteConfig.instagramUrl : '/';
  const contactEmail = siteConfig && siteConfig.email ? siteConfig.email : '';

  return (
    <>
      <div className="contact-bar f-h-center">
        <span className="contact-item">
          <a
            className="btn cta t-l-1 instagram-cta"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
          </a>
        </span>
        <span className="contact-item">
          <a
            className="btn t-l-1 cta email"
            href={`mailto:${contactEmail}`}
            target="_blank"
          >
            EMAIL
          </a>
        </span>
      </div>
      <style jsx>{`
        .contact-bar {
          border-top: 1.3px solid ${color};
          justify-content: space-between;
          .btn {
            color: ${textColor};
          }
        }
        .contact-item {
          padding: var(--s-14);
        }
      `}</style>
    </>
  );
};

export default ContactBar;
