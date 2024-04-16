import React from 'react';
import ImageAspectRatio from '@/components/ImageAspectRatio';

const SlideItem = (props) => {
  const { itemData, isCurrent, cols, gap } = props;

  return (
    <>
      <div
        aria-hidden={!isCurrent}
        className="carousel-item"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridGap: `${gap}px`,
        }}
      >
        <ImageAspectRatio
          src={itemData.asset._ref}
          alt="gallery-img"
          aspectRatio="4:3"
          backgroundColor="transparent"
        />
      </div>

      <style jsx>{``}</style>
    </>
  );
};

export default SlideItem;
