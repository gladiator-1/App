/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles/styles';

const propTypes = {
    /** File object maybe be instance of File or Object */
    file: PropTypes.shape({
        name: PropTypes.string,
    }),

    /** video extension */
    ext: PropTypes.string,

};

const defaultProps = {
    file: {
        name: '',
    },
    ext: '',

};

class AttachedVideo extends React.PureComponent {
    render() {
        return (

            <View
                style={[styles.h80, styles.alignItemsCenter, styles.justifyContentCenter]}
            >
                <video style={{...styles.webViewStyles.tagStyles.video, ...styles.h100}} controls>
                    <source src={window.URL.createObjectURL(this.props.file)} type={`video/${this.props.ext}`} />
                </video>
            </View>

        );
    }
}
AttachedVideo.propTypes = propTypes;
AttachedVideo.defaultProps = defaultProps;
AttachedVideo.displayName = 'AttachedVideo';
export default AttachedVideo;
