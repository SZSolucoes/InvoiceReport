import React from 'react';
import { 
    View, 
    Animated, 
    Dimensions, 
    TouchableWithoutFeedback,
    StyleSheet,
    ScrollView,
    PanResponder
} from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { 
    modifyIsSideMenuOpen, 
    modifySideMenuSelected, 
    modifyDxSideMenuPos 
} from '../../actions/EventsActions';
import { modifyReportSelected } from '../../actions/ReportActions';
import { colorAppPrimary } from '../../utils/constants';

class SideMenu extends React.Component {

    constructor(props) {
        super(props);

        this.showSideMenu = this.showSideMenu.bind(this);
        this.onPressItemMenu = this.onPressItemMenu.bind(this);

        this.state = {
            animScreenT: new Animated.Value(-Dimensions.get('window').width),
            enableScroll: true
        };

        this.state.animScreenT.addListener((event) => {
            if (event.value === 0) {
                this.setState({ enableScroll: true });
            } else if (this.state.enableScroll) {
                this.setState({ enableScroll: false });
            }
            return;
        });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (event, gestureState) => gestureState.dx < -10,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: (event, gestureState) => {
                this.state.animScreenT.setValue(gestureState.dx);
                //this.props.modifyDxSideMenuPos(gestureState.dx);
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.vx < -0.5) {
                    this.props.modifyIsSideMenuOpen(false);
                    return;
                }
                if (gestureState.dx > -(Dimensions.get('window').width / 2.7)) {
                    this.showSideMenu(true);
                    this.props.modifyIsSideMenuOpen(true);
                    this.props.modifyDxSideMenuPos(0);
                } else {
                    this.showSideMenu(false);
                    this.props.modifyIsSideMenuOpen(false);
                }
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderTerminate: (event, gestureState) => { 
                if (gestureState.dx > -(Dimensions.get('window').width / 2.7)) {
                    this.showSideMenu(true);
                    this.props.modifyIsSideMenuOpen(true);
                    this.props.modifyDxSideMenuPos(0);
                } else {
                    this.showSideMenu(false);
                    this.props.modifyIsSideMenuOpen(false);
                }
            },
            onPanResponderStart: () => {},
            onPanResponderGrant: () => {}
        });
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.isOpen !== this.props.isOpen) {
            this.showSideMenu(nextProps.isOpen);
        }
    
        return nextProps !== this.props || nextStates !== this.state;
    }

    onPressItemMenu(key) {
        if (key === this.props.sideMenuSelected) {
            this.props.modifyIsSideMenuOpen(false);
            return;
        }
        switch (key) {
            case 'regiao':
                this.props.modifyReportSelected('regiao');
                this.props.modifyIsSideMenuOpen(false);
                Actions.reset('mainTabBar', { title: 'Região' });
                this.props.modifySideMenuSelected('regiao');
                break;
            case 'equipe':  
                this.props.modifyReportSelected('equipe');
                this.props.modifyIsSideMenuOpen(false);
                Actions.reset('mainTabBar', { title: 'Equipe' });
                this.props.modifySideMenuSelected('equipe');
                break;
            case 'estabelecimento':
                this.props.modifyReportSelected('estabelecimento');
                this.props.modifyIsSideMenuOpen(false);
                Actions.reset('mainTabBar', { title: 'Estabelecimento' });
                this.props.modifySideMenuSelected('estabelecimento');
                break;
            case 'bu':
                this.props.modifyReportSelected('bu');
                this.props.modifyIsSideMenuOpen(false);
                Actions.reset('mainTabBar', { title: 'BU' });
                this.props.modifySideMenuSelected('bu');
                break;
            case 'segmento':
                this.props.modifyReportSelected('segmento');
                this.props.modifyIsSideMenuOpen(false);
                Actions.reset('mainTabBar', { title: 'Segmento' });
                this.props.modifySideMenuSelected('segmento');
                break;
            default:
        }
    }

    showSideMenu(value) {
        if (value) {
            Animated.spring(
                this.state.animScreenT, 
                {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 0
                }
            ).start();
        } else {
            Animated.spring(
                this.state.animScreenT, 
                {
                    toValue: -Dimensions.get('window').width,
                    useNativeDriver: true,
                    bounciness: 0
                }
            ).start();
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
                        transform: [{ translateX: this.state.animScreenT.interpolate({
                            inputRange: [-Dimensions.get('window').width, 0],
                            outputRange: [-Dimensions.get('window').width, 0],
                            extrapolate: 'clamp'
                        }) }],
                    }} 
                >
                    <View
                        {...this.panResponder.panHandlers}
                        style={{
                            flex: 1,
                            flexDirection: 'row' 
                        }} 
                    >
                        <TouchableWithoutFeedback>
                            <View 
                                style={styles.menuView}
                            >
                                <ScrollView
                                    style={{ flex: 1 }}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    scrollEnabled={this.state.enableScroll}
                                >
                                    <View style={styles.menuHeader}>
                                        <Text style={{ textAlign: 'right' }}>
                                            versão: 1.0.0
                                        </Text>
                                    </View>
                                    <View style={styles.menuBody}>
                                        <ListItem
                                            key={'regiao'}
                                            title={'Região'}
                                            hideChevron
                                            leftIcon={(
                                                <View 
                                                    style={[
                                                        styles.leftIconMenu,
                                                        { 
                                                            backgroundColor: 
                                                                this.props.sideMenuSelected 
                                                                === 'regiao' ?
                                                                colorAppPrimary : 'transparent' 
                                                        }
                                                    ]} 
                                                />
                                            )}
                                            wrapperStyle={{ marginLeft: 2 }}
                                            titleStyle={[
                                                styles.textStyle,
                                                { ...this.props.sideMenuSelected 
                                                    === 'regiao' ?
                                                    { color: colorAppPrimary } : {} }
                                            ]}
                                            onPress={() => this.onPressItemMenu('regiao')}
                                        />
                                        <ListItem
                                            key={'equipe'}
                                            title={'Equipe'}
                                            hideChevron
                                            leftIcon={(
                                                <View 
                                                    style={[
                                                        styles.leftIconMenu,
                                                        { 
                                                            backgroundColor: 
                                                                this.props.sideMenuSelected 
                                                                === 'equipe' ?
                                                                colorAppPrimary : 'transparent' 
                                                        }
                                                    ]} 
                                                />
                                            )}
                                            wrapperStyle={{ marginLeft: 2 }}
                                            titleStyle={[
                                                styles.textStyle,
                                                { ...this.props.sideMenuSelected 
                                                    === 'equipe' ?
                                                    { color: colorAppPrimary } : {} }
                                            ]}
                                            onPress={() => this.onPressItemMenu('equipe')}
                                        />
                                        <ListItem
                                            key={'estabelecimento'}
                                            title={'Estabelecimento'}
                                            hideChevron
                                            leftIcon={(
                                                <View 
                                                    style={[
                                                        styles.leftIconMenu,
                                                        { 
                                                            backgroundColor: 
                                                                this.props.sideMenuSelected 
                                                                === 'estabelecimento' ?
                                                                colorAppPrimary : 'transparent' 
                                                        }
                                                    ]} 
                                                />
                                            )}
                                            wrapperStyle={{ marginLeft: 2 }}
                                            titleStyle={[
                                                styles.textStyle,
                                                { ...this.props.sideMenuSelected 
                                                    === 'estabelecimento' ?
                                                    { color: colorAppPrimary } : {} }
                                            ]}
                                            onPress={() => this.onPressItemMenu('estabelecimento')}
                                        />
                                        <ListItem
                                            key={'bu'}
                                            title={'BU'}
                                            hideChevron
                                            leftIcon={(
                                                <View 
                                                    style={[
                                                        styles.leftIconMenu,
                                                        { 
                                                            backgroundColor: 
                                                                this.props.sideMenuSelected 
                                                                === 'bu' ?
                                                                colorAppPrimary : 'transparent' 
                                                        }
                                                    ]} 
                                                />
                                            )}
                                            wrapperStyle={{ marginLeft: 2 }}
                                            titleStyle={[
                                                styles.textStyle,
                                                { ...this.props.sideMenuSelected 
                                                    === 'bu' ?
                                                    { color: colorAppPrimary } : {} }
                                            ]}
                                            onPress={() => this.onPressItemMenu('bu')}
                                        />
                                        <ListItem
                                            key={'segmento'}
                                            title={'Segmento'}
                                            hideChevron
                                            leftIcon={(
                                                <View 
                                                    style={[
                                                        styles.leftIconMenu,
                                                        { 
                                                            backgroundColor: 
                                                                this.props.sideMenuSelected 
                                                                === 'segmento' ?
                                                                colorAppPrimary : 'transparent' 
                                                        }
                                                    ]} 
                                                />
                                            )}
                                            wrapperStyle={{ marginLeft: 2 }}
                                            titleStyle={[
                                                styles.textStyle,
                                                { ...this.props.sideMenuSelected 
                                                    === 'segmento' ?
                                                    { color: colorAppPrimary } : {} }
                                            ]}
                                            onPress={() => this.onPressItemMenu('segmento')}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flex: 1 }} />
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    menuView: {
        backgroundColor: 'white', 
        flex: 1.5,
    },
    menuHeader: {
        flex: 1, 
        backgroundColor: '#E7EAED',
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    menuBody: {
        flex: 2, 
        backgroundColor: 'white'
    },
    leftIconMenu: {
        width: 5, 
        height: 40,
        marginRight: 10,
        borderRadius: 2
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '700'
    }
});

const mapStateToProps = (state) => ({
    isOpen: state.EventsReducer.isSideMenuOpen,
    sideMenuSelected: state.EventsReducer.sideMenuSelected
});

export default connect(mapStateToProps, { 
    modifyIsSideMenuOpen,
    modifySideMenuSelected,
    modifyDxSideMenuPos,
    modifyReportSelected
})(SideMenu);
