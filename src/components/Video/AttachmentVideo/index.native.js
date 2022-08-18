import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';
import RNFetchBlob from 'react-native-blob-util';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../withWindowDimensions';
import themeColors from '../../../styles/themes/default';
import styles from '../../../styles/styles';
import attachmentVideoPlayer from '../InlineHTML/attachmentVideoPlayer';

const propTypes = {
    /** File object maybe be instance of File or Object */
    file: PropTypes.shape({
        name: PropTypes.string,
    }),

    /** video extension */
    ext: PropTypes.string,

    /** Props inherited from withWindowDimensions */
    ...windowDimensionsPropTypes,

};

const defaultProps = {
    file: {
        name: '',
    },
    ext: '',
};

class AttachedVideo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: 1,
            videoHeight: 0,
        };
    }

    render() {
        return (
            <View style={[{
                marginTop: (this.props.windowHeight / 2) - (((this.props.windowWidth * 0.8 * this.state.videoHeight) / this.state.videoWidth) / 2),
            },
            styles.alignItemsCenter,
            styles.justifyContentCenter,
            styles.w100,
            styles.h100]}
            >
                <WebView
                    scalesPageToFit
                    allowsFullscreenVideo
                    allowFileAccess
                    domStorageEnabled
                    allowUniversalAccessFromFileURLs
                    allowFileAccessFromFileURLs
                    originWhitelist={['*']}
                    allowingReadAccessToURL
                    ref={el => this.webRef = el}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    onMessage={(event) => {
                        if (event.nativeEvent.data.startsWith('w')) {
                            this.setState({videoWidth: parseInt(event.nativeEvent.data.slice(1), 10)});
                        }

                        if (event.nativeEvent.data.startsWith('h')) {
                            this.setState({videoHeight: parseInt(event.nativeEvent.data.slice(1), 10)});
                        }
                    }}
                    style={
                        {width: this.props.windowWidth, height: this.props.windowHeight}
                    }
                    source={{
                        baseUrl: RNFetchBlob.fs.dirs.DocumentDir,
                        html: attachmentVideoPlayer(this.props.file.uri, this.props.ext),
                    }}
                />

                {!(this.state.videoHeight && this.state.videoWidth) ? (
                    <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <ActivityIndicator color={themeColors.spinner} size="large" />
                    </View>
                ) : null}

            </View>

        );
    }
}

AttachedVideo.propTypes = propTypes;
AttachedVideo.defaultProps = defaultProps;
AttachedVideo.displayName = 'AttachedVideo';
export default withWindowDimensions(AttachedVideo);
