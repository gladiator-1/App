import PropTypes from 'prop-types';
import {windowDimensionsPropTypes} from '../withWindowDimensions';

const propTypes = {
    /** a video extension string */
    ext: PropTypes.string,

    /** The video uri */
    uri: PropTypes.string.isRequired,

    /** Props inherited from withWindowDimensions */
    ...windowDimensionsPropTypes,
};

const defaultProps = {
    uri: '',
};

export {
    propTypes,
    defaultProps,
};
