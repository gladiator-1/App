import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import {propTypes, defaultProps} from './VideoPropTypes';
import withWindowDimensions from '../withWindowDimensions';
import themeColors from '../../styles/themes/default';
import variables from '../../styles/variables';
import styles from '../../styles/styles';
import iosVideoPlayer from './InlineHTML/iosVideoPlayer';

class Video extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: 0,
            videoHeight: 0,
        };
    }

    render() {
        return (
            <>
                <WebView
                    scalesPageToFit
                    allowsFullscreenVideo
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
                    style={[{opacity: !(this.state.videoHeight && this.state.videoWidth) ? 0 : 1},
                    // eslint-disable-next-line no-nested-ternary
                        (this.state.videoHeight && this.state.videoWidth)
                            ? !this.props.isSmallScreenWidth
                                ? {
                                    width: (this.props.windowWidth - variables.sideBarWidth) * 0.8,
                                    height: ((this.props.windowWidth - variables.sideBarWidth) * 0.8 * this.state.videoHeight) / this.state.videoWidth,
                                }
                                : {width: this.props.windowWidth * 0.7, height: (this.props.windowWidth * 0.7 * this.state.videoHeight) / this.state.videoWidth} : null]}
                    source={{
                        html: iosVideoPlayer(this.props.src, this.props.ext),
                    }}
                />

                {!(this.state.videoHeight && this.state.videoWidth) ? (
                    <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <ActivityIndicator color={themeColors.spinner} size="large" />
                    </View>
                ) : null}

            </>
        );
    }
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.displayName = 'Video';
export default withWindowDimensions(Video);
