export default function ImageContainer({ source, width, caption, align, alt }) {
  const ImageContainerWidth = width ? width : '100%';
  const imageAlt = alt ? alt : 'image';
  const getAlign = () => {
    if (align === 'left') return '0 auto 0 0';
    if (align === 'right') return '0 0 0 auto';
    return '0 auto';
  };
  return (
    <>
      <figure className="image-container">
        <img src={source} alt={imageAlt} />
        {caption && <figcaption className="t-b-2">{caption}</figcaption>}
      </figure>
      <style jsx>{`
        .image-container {
          width: ${ImageContainerWidth};
          height: 100%;
          overflow: hidden;
          margin: ${getAlign()};
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
}
