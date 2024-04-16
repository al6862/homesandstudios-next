import { imageBuilder } from '@/lib/sanity';

const ImageAspectRatio = (props) => {
  const aspectRatio = props.aspectRatio ? props.aspectRatio : '16:9';
  const aspectRatioNumber = aspectRatio.split(':');
  const aspectRatioPadding =
    (+aspectRatioNumber[1] / +aspectRatioNumber[0]) * 100 + '%';
  const maxWidth = props.maxWidth ? props.maxWidth : '100%';
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : 'transparent';

  return (
    <>
      <div className="image-container">
        <img src={imageBuilder(props.src).url()} alt={props.alt} />
      </div>
      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          margin: 0px auto;
          max-width: ${maxWidth};
          &:before {
            content: '';
            display: block;
            width: 100%;
            padding-top: ${aspectRatioPadding};
            background: ${backgroundColor};
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
};

export default ImageAspectRatio;
