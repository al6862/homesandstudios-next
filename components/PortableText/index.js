import PropTypes from 'prop-types';
import { createPortableTextComponent } from 'next-sanity';
import { config } from '@/lib/config';

import serializers from './serializers';

const PortableText = createPortableTextComponent({
  ...config,
  serializers,
});

PortableText.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
};

export default PortableText;
