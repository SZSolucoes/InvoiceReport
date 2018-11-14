import React from 'react';
import { 
    Animated, 
    View,
    Dimensions,
    StyleSheet,
    Platform,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { modifyShowSearchBarMain } from '../../actions/EventsActions';
import { modifyReportFilterStr, modifyReportFilterLoading } from '../../actions/ReportActions';
import { colorAppPrimary, getMenuName } from '../../utils/constants';

class SearchBarMain extends React.Component {

    constructor(props) {
        super(props);

        this.startShowSearchAnim = this.startShowSearchAnim.bind(this);
        this.startKeyboardAnim = this.startKeyboardAnim.bind(this);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);

        this.mainViewHeight = 75;
        this.keyboardHeight = 0;
        this.keyboardIsOpen = false;

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);

        this.state = {
            animSearchBarValue: new Animated.Value(Dimensions.get('window').height)
        };
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.showSearchBarMain !== this.props.showSearchBarMain) {
            this.startShowSearchAnim(nextProps.showSearchBarMain);
        }
    
        return nextProps !== this.props || nextStates !== this.state;
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardShow(e) {
        this.keyboardIsOpen = true;
        this.keyboardHeight = e.endCoordinates.height;
        if (this.props.showSearchBarMain) {
            this.startKeyboardAnim(true, this.keyboardHeight);
        }
    }
    
    keyboardHide() {
        this.keyboardIsOpen = false;
        if (this.props.showSearchBarMain) {
            this.startKeyboardAnim(false, this.keyboardHeight);
        }
    }

    startShowSearchAnim(showSearchBar) {
        if (showSearchBar) {
            if (this.keyboardIsOpen) {
                this.startKeyboardAnim(true, this.keyboardHeight);
            } else {
                Animated.spring(
                    this.state.animSearchBarValue,
                    {
                        toValue: Dimensions.get('window').height - this.mainViewHeight,
                        bounciness: 0,
                        useNativeDriver: true
                    }
                ).start();
            }
        } else {
            Animated.spring(
                this.state.animSearchBarValue,
                {
                    toValue: Dimensions.get('window').height,
                    bounciness: 0,
                    useNativeDriver: true
                }
            ).start();
        }
    }

    startKeyboardAnim(onShowKeyboard, keyboardHeight) {
        if (onShowKeyboard) {
            const pos = (Dimensions.get('window').height - keyboardHeight) - this.mainViewHeight;
            Animated.spring(
                this.state.animSearchBarValue,
                {
                    toValue: pos,
                    bounciness: 0,
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.spring(
                this.state.animSearchBarValue,
                {
                    toValue: Dimensions.get('window').height - this.mainViewHeight,
                    bounciness: 0,
                    useNativeDriver: true
                }
            ).start();
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    zIndex: this.props.zIndex,
                    width: '100%',
                    height: this.mainViewHeight,
                    transform: [{ translateY: this.state.animSearchBarValue }]
                }}
            >
                <View style={styles.mainView}>
                    <View style={{ flex: 2 }}>
                        <SearchBar
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            noIcon
                            clearIcon={!!this.props.reportFilterStr}
                            onClearText={() => this.props.modifyReportFilterLoading(
                                { diario: false, acumulado: false, projecao: false }
                            )}
                            showLoadingIcon={
                                this.props.reportFilterLoading.diario ||
                                this.props.reportFilterLoading.acumulado ||
                                this.props.reportFilterLoading.projecao
                            }
                            containerStyle={{ 
                                backgroundColor: 'transparent',
                                borderTopWidth: 0, 
                                borderBottomWidth: 0
                            }}
                            inputStyle={{ 
                                backgroundColor: 'transparent', 
                                borderBottomColor: 'white', 
                                borderBottomWidth: 1, 
                                margin: 0, 
                                marginHorizontal: 8,
                                paddingBottom: 0
                            }}
                            value={this.props.reportFilterStr}
                            onChangeText={(value) => {
                                this.props.modifyReportFilterStr(value);
                                this.props.modifyReportFilterLoading(
                                    { diario: true, acumulado: true, projecao: true }
                                );
                            }}
                            placeholder={
                                `Filtrar ${
                                    getMenuName(this.props.sideMenuSelected).toLowerCase()
                                }...`
                            }
                        />
                    </View>
                    <View 
                        style={{ 
                            flex: 0.5, 
                            flexDirection: 'row', 
                            alignItems: 'flex-start',
                            justifyContent: 'center' 
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 0.15 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.props.modifyShowSearchBarMain(false)
                                    }
                                >
                                    <Icon
                                        iconStyle={{ marginHorizontal: 5 }}
                                        color={'white'}
                                        name={'chevron-down'}
                                        type='material-community'
                                        size={36}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        backgroundColor: colorAppPrimary,
        ...Platform.select({
            ios: {
              shadowColor: 'rgba(0,0,0, .2)',
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 1,
              shadowRadius: 1,
            },
            android: {
              elevation: 1,
            },
        }),
    }
});

const mapStateToProps = (state) => ({
    showSearchBarMain: state.EventsReducer.showSearchBarMain,
    sideMenuSelected: state.EventsReducer.sideMenuSelected,
    reportFilterStr: state.ReportReducer.reportFilterStr,
    reportFilterLoading: state.ReportReducer.reportFilterLoading
});

export default connect(mapStateToProps, {
    modifyShowSearchBarMain, 
    modifyReportFilterStr,
    modifyReportFilterLoading
}, null, { withRef: true })(SearchBarMain);

