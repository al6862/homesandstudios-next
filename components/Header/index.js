export default function Header(props) {
  const { background, textColor } = props;
  const backgroundColor = background ? background : 'var(--cr-white)';
  const color = textColor ? textColor : 'var(--cr-black)';
  return (
    <>
      <div className="header">{props.children}</div>
      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background: ${backgroundColor};
          border-bottom: 1.3px solid ${color};
          padding: 0 var(--s-20);
          z-index: 110;
          span {
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  );
}
