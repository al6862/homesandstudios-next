// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import siteConfig from './documents/siteConfig';
import blockContent from './plugs/blockContent';
import callToAction from './plugs/callToAction';
import imageGroup from './plugs/imageGroup';
import imageObject from './plugs/imageObject';
import homeImage from './plugs/homeImage';
import architecture from './architecture';
import infoPage from './infoPage';
import pages from './pages';

import link from './plugs/link';
import simplePortableText from './plugs/simplePortableText';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    imageObject,
    imageGroup,
    callToAction,
    link,
    blockContent,
    simplePortableText,
    pages,
    architecture,
    infoPage,
    siteConfig,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    homeImage,
  ]),
});
