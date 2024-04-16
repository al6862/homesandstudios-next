import React from 'react';
import EmbedHTML from './EmbedHTML';
import clsx from 'clsx';
import { imageBuilder } from '@/lib/sanity';
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
  types: {
    embedHTML: EmbedHTML,
    block(props) {
      const { style = 'normal' } = props.node;

      if (/^h\d/.test(style)) {
        const level = style.replace(/[^\d]/g, '');
        return React.createElement(
          style,
          { className: `heading-${level}` },
          props.children
        );
      }

      if (style === 'blockquote') {
        return <blockquote>- {props.children}</blockquote>;
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props);
    },
    imageGroup: (props) => {
      const { node } = props;
      return (
        <div className="image-group">
          {node.image1 && (
            <img
              src={imageBuilder(node.image1.asset._ref).url()}
              alt={props.alt}
            />
          )}
          {node.image2 && (
            <img
              src={imageBuilder(node.image2.asset._ref).url()}
              alt={props.alt}
            />
          )}
        </div>
      );
    },
    imageObject: (props) => {
      const { node } = props;
      return (
        <>
          <div className={clsx('image-obj', node.size, node.align)}>
            <img
              src={imageBuilder(node.image.asset._ref).url()}
              alt={props.alt}
            />
            {node.caption && <p>{node.caption}</p>}
          </div>
          <style jsx>{`
            .image-obj {
              display: block;
              margin: 0 0 var(--s-16);
              img {
                display: block;
                width: 100%;
              }
              &.large {
                width: 70%;
              }
              &.medium {
                width: 55%;
              }
              &.small {
                width: 30%;
              }
              &.left {
                margin-right: auto;
              }
              &.right {
                margin-left: auto;
              }
              &.center {
                margin-right: auto;
                margin-left: auto;
              }
            }
          `}</style>
        </>
      );
    },
  },
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};

export default serializers;
