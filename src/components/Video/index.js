/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import themeColors from '../../styles/themes/default';
import {propTypes, defaultProps} from './VideoPropTypes';
import withWindowDimensions from '../withWindowDimensions';
import variables from '../../styles/variables';
import PlayVideoContext from '../../context/PlayVideoContext';
import styles from '../../styles/styles';

class Video extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            // eslint-disable-next-line no-nested-ternary
            this.props.isSmallScreenWidth
                ? this.context ? (
                    <View style={{width: this.props.windowWidth * 0.6}}>
                        <video style={{...styles.h100, ...styles.webViewStyles.tagStyles.video}} controls>
                            <source src={this.props.src} type={`video/${this.props.ext}`} />
                        </video>
                    </View>
                )
                    : (
                        <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <ActivityIndicator color={themeColors.spinner} size="large" />
                        </View>
                    )
                : (
                    <View style={{width: (this.props.windowWidth - variables.sideBarWidth) * 0.5}}>
                        <video style={{...styles.h100, ...styles.webViewStyles.tagStyles.video}} controls>
                            <source src={this.props.src} type={`video/${this.props.ext}`} />
                        </video>
                    </View>
                )
        );
    }
}
Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.contextType = PlayVideoContext;
Video.displayName = 'Video';
export default withWindowDimensions(Video);

