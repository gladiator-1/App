import React, {PureComponent} from 'react';
import {
    View, ActivityIndicator, Pressable,
} from 'react-native';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import {propTypes, defaultProps} from './VideoPropTypes';
import withWindowDimensions from '../withWindowDimensions';
import styles from '../../styles/styles';
import themeColors from '../../styles/themes/default';
import * as Expensicons from '../Icon/Expensicons';
import Icon from '../Icon';
import Text from '../Text';
import variables from '../../styles/variables';
import androidSmallScreenVideoPlayer from './InlineHTML/androidSmallScreenVideoPlayer';
import androidLargeScreenVideoPlayer from './InlineHTML/androidLargeScreenVideoPlayer';
import androidVideoThumbnail from './InlineHTML/androidVideoThumbnail';

class Video extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: 0,
            videoHeight: 0,
            isModalVisible: false,
            videoDuration: '',
        };
    }

    render() {
        return (
            this.props.isSmallScreenWidth ? (
                <>
                    <Modal
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        style={[styles.pAbsolute,
                            styles.r0,
                            styles.b0, {
                                backgroundColor: themeColors.shadow,
                                top: -20,
                                left: -21,
                                width: this.props.windowWidth,
                                height: this.props.windowHeight,
                            }]}
                        deviceWidth={this.props.windowWidth}
                        deviceHeight={this.props.windowHeight}
                        onBackButtonPress={() => {
                            this.setState({isModalVisible: false});
                        }}
                        onSwipeComplete={() => {
                            this.setState({isModalVisible: false});
                        }}
                        swipeDirection={['up', 'down']}
                        isVisible={this.state.isModalVisible}
                    >

                        <WebView
                            scalesPageToFit
                            allowsFullscreenVideo
                            ref={el => this.webRef1 = el}
                            mediaPlaybackRequiresUserAction={false}
                            onMessage={(event) => {
                                if (event.nativeEvent.data.startsWith('w')) {
                                    this.setState({videoWidth: parseInt(event.nativeEvent.data.slice(1), 10)});
                                }

                                if (event.nativeEvent.data.startsWith('h')) {
                                    this.setState({videoHeight: parseInt(event.nativeEvent.data.slice(1), 10)});
                                }
                            }}
                            style={[styles.w100, styles.pAbsolute, {
                                backgroundColor: themeColors.shadow,
                                height: (this.props.windowWidth * this.state.videoHeight) / this.state.videoWidth,
                                top: (this.props.windowHeight / 2) - (((this.props.windowWidth * this.state.videoHeight) / this.state.videoWidth) / 2),
                            }]}
                            source={{
                                html: androidSmallScreenVideoPlayer(this.props.src, this.props.ext),
                            }}
                        />
                    </Modal>

                    {!(this.state.videoHeight && this.state.videoWidth) ? (
                        <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <ActivityIndicator color={themeColors.spinner} size="large" />
                        </View>
                    ) : null}

                    <Pressable disabled={!(this.state.videoHeight && this.state.videoWidth)} onPress={() => this.setState({isModalVisible: true})}>
                        <WebView
                            style={[{opacity: !(this.state.videoHeight && this.state.videoWidth) ? 0 : 1},
                                (this.state.videoHeight && this.state.videoWidth)
                                    ? {width: this.props.windowWidth * 0.7, height: (this.props.windowWidth * 0.7 * this.state.videoHeight) / this.state.videoWidth} : null]}
                            scalesPageToFit
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            allowsFullscreenVideo
                            ref={el => this.webRef = el}
                            onMessage={(event) => {
                                if (event.nativeEvent.data.startsWith('w1')) {
                                    this.setState({videoWidth: parseInt(event.nativeEvent.data.slice(2), 10)});
                                }

                                if (event.nativeEvent.data.startsWith('h1')) {
                                    this.setState({videoHeight: parseInt(event.nativeEvent.data.slice(2), 10)});
                                }

                                if (event.nativeEvent.data.startsWith('d1')) {
                                    this.setState({videoDuration: event.nativeEvent.data.slice(2)});
                                }
                            }}
                            source={{
                                html: androidVideoThumbnail(this.props.src, this.props.ext),
                            }}
                        />
                        {(this.state.videoHeight && this.state.videoWidth) ? (
                            <>
                                <View style={[styles.pAbsolute, {
                                    top: (((this.props.windowWidth * 0.7 * this.state.videoHeight) / this.state.videoWidth) / 2) - 30,
                                    left: ((this.props.windowWidth * 0.7) / 2) - 30,
                                }]}
                                >
                                    <Icon
                                        src={Expensicons.PlayIcon}
                                        height={60}
                                        width={60}
                                    />
                                </View>

                                <View style={styles.videoIconContainer}>
                                    <Icon
                                        src={Expensicons.videoIcon}
                                        height={17}
                                        width={17}
                                    />
                                    <View style={{marginLeft: 10}}>
                                        <Text style={styles.videoDurationText} color={themeColors.icon}>{this.state.videoDuration}</Text>
                                    </View>
                                </View>

                            </>
                        )
                            : null}
                    </Pressable>
                </>
            )
                : (
                    <>
                        <WebView
                            scalesPageToFit
                            allowsFullscreenVideo
                            ref={el => this.webRef2 = el}
                            onMessage={(event) => {
                                if (event.nativeEvent.data.startsWith('w2')) {
                                    this.setState({videoWidth: parseInt(event.nativeEvent.data.slice(2), 10)});
                                }

                                if (event.nativeEvent.data.startsWith('h2')) {
                                    this.setState({videoHeight: parseInt(event.nativeEvent.data.slice(2), 10)});
                                }
                            }}
                            style={[styles.webViewStyles.tagStyles.video,
                                (this.state.videoHeight && this.state.videoWidth)
                                    ? {
                                        width: (this.props.windowWidth - variables.sideBarWidth) * 0.8,
                                        height: ((this.props.windowWidth - variables.sideBarWidth) * 0.8 * this.state.videoHeight) / this.state.videoWidth,
                                    } : null]}
                            source={{
                                html: androidLargeScreenVideoPlayer(this.props.src, this.props.ext),
                            }}
                        />

                        {!(this.state.videoHeight && this.state.videoWidth) ? (
                            <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                <ActivityIndicator color={themeColors.spinner} size="large" />
                            </View>
                        ) : null}
                    </>
                )
        );
    }
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.displayName = 'Video';
export default withWindowDimensions(Video);
