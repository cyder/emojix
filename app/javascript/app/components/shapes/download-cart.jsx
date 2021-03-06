import PropTypes from 'prop-types';

import EmojiShape from './emoji';

const DownloadCartShape = PropTypes.shape({
  list: PropTypes.arrayOf(EmojiShape.isRequired).isRequired,
});

export default DownloadCartShape;
