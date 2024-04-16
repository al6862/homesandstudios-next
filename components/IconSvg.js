import React from 'react';
import clsx from 'clsx';

const IconSvg = (props) => {
  const { type, width, height, viewBox, stroke, fill, strokeWidth, style } =
    props;

  const mapTypeToSvg = {
    closeX: {
      attrs: {
        className: 'svg_icon svg_icon-x',
      },
      dom: { d: 'M1.247 1.246l20.506 20.507M1.247 21.753L21.753 1.247' },
    },
    ArrowRight: {
      attrs: {
        className: 'svg_icon svg_icon-arrow-right',
      },
      dom: {
        d: 'M50.4759 0L84.9535 29.414H0V45.5245H84.9535L49.7147 74H70.6685L108 44.025V30.3504L72 0H50.4759Z',
      },
    },
    ChevronRight: {
      attrs: {
        className: 'svg_icon svg_icon-chevron-right',
      },
      dom: {
        d: 'M29.8555 3L56.7107 29.8552L29.8555 56.7104',
      },
    },
    ChevronLeft: {
      attrs: {
        className: 'svg_icon svg_icon-chevron-right',
      },
      dom: {
        d: 'M29.8555 56.7104L3.00024 29.8552L29.8555 3',
      },
    },
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : '0 0 24 24'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fillRule="evenodd"
        clipRule="evenodd"
        className={clsx(mapTypeToSvg[type].attrs.className)}
        {...mapTypeToSvg[type].attrs}
        {...mapTypeToSvg[type].dom}
      />
    </svg>
  );
};

export default IconSvg;
