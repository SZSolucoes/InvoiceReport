import React from 'react';
import { 
    Animated, 
    Dimensions, 
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import { modifyIsSideMenuOpen, modifySideMenuSelected } from '../../actions/EventsActions';
import { interpolateRange } from '../../utils/numbersComplex';

class FadeScreenAnim extends React.Component {

    constructor(props) {
        super(props);

        this.doFadeAnim = this.doFadeAnim.bind(this);

        this.state = {
            animScreenT: new Animated.Value(-Dimensions.get('window').width),
            fadeAnimValue: new Animated.Value(0),
        };
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.isOpen !== this.props.isOpen) {
            this.doFadeAnim(nextProps.isOpen); 
        }

        if (nextProps.dxSideMenuPos !== this.props.dxSideMenuPos) {
            if (nextProps.dxSideMenuPos === 0) {
                this.doFadeAnim(true);
            } else {
                const value = interpolateRange(
                    -Dimensions.get('window').width,
                    0,
                    0,
                    0.4,
                    true
                )(nextProps.dxSideMenuPos);
                this.state.fadeAnimValue.setValue(value);
            }
        }

        return nextProps !== this.props || nextStates !== this.state;
    }

    doFadeAnim(value) {
        if (value) {
            Animated.parallel([
                Animated.timing(
                    this.state.animScreenT, 
                    {
                        toValue: 0,
                        useNativeDriver: true,
                        duration: 0
                    }
                ),
                Animated.timing(
                    this.state.fadeAnimValue,
                    {
                        toValue: 0.4,
                        duration: 500
                    }
                )
            ]).start();
        } else {
            Animated.sequence([
                Animated.timing(
                    this.state.fadeAnimValue,
                    {
                        toValue: 0,
                        duration: 50
                    }
                ),
                Animated.timing(
                    this.state.animScreenT, 
                    {
                        toValue: -Dimensions.get('window').width,
                        useNativeDriver: true,
                        duration: 0
                    }
                )
            ]).start();
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.modifyIsSideMenuOpen(false)}
            >
                <Animated.View 
                    style={{
                        position: 'absolute', 
                        width: '100%',
                        height: '100%',
                        transform: [{ translateX: this.state.animScreenT }],
                    }} 
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: this.state.fadeAnimValue.interpolate({
                                inputRange: [0, 0.4],
                                outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)'],
                                extrapolate: 'clamp'
                            })
                        }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => ({
    isOpen: state.EventsReducer.isSideMenuOpen,
    sideMenuSelected: state.EventsReducer.sideMenuSelected,
    dxSideMenuPos: state.EventsReducer.dxSideMenuPos,
});

export default connect(mapStateToProps, { 
    modifyIsSideMenuOpen,
    modifySideMenuSelected
})(FadeScreenAnim);
