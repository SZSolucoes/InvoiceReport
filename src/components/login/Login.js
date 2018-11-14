
import React from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    StatusBar, 
    TouchableWithoutFeedback, 
    Keyboard,
    Platform,
    Animated,
    AsyncStorage
} from 'react-native';
import { Card, Icon, FormInput, Button } from 'react-native-elements';
import { BarChart, Grid, XAxis, YAxis, StackedAreaChart } from 'react-native-svg-charts';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as shape from 'd3-shape';
import { colorAppPrimary } from '../../utils/constants';
import { getUIDKey, setStorageKey } from '../../utils/storage';

import {
    modifyUrlServer,
    modifyUserLogin,
    modifyUserPass
 } from '../../actions/LoginActions';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.changedLayout = true;
        this.numCharts = ['bar', 'area'];
        this.keyboardHeight = 0;
        this.serverNoFocused = true;
        this.openViewLogin = false;
        this.openViewServer = false;

        StatusBar.setBackgroundColor(colorAppPrimary, true);

        this.onPressEnter = this.onPressEnter.bind(this);
        this.onAnimFormLogin = this.onAnimFormLogin.bind(this);
        this.onAnimFormServer = this.onAnimFormServer.bind(this);
        this.doResetUrlServer = this.doResetUrlServer.bind(this);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);
        this.renderStackedAreaChart = this.renderStackedAreaChart.bind(this);

        this.state = {
            inputUserPasswordEye: true,
            marginTop: 0,
            marginBottom: 0,
            animChart: new Animated.Value(1),
            animCard: new Animated.Value(0),
            animCardServer: new Animated.Value(0),
            viewCardFields: 0,
            loadingOn: false,
            changedLayoutServer: true,
            chartChoosed: this.numCharts[Math.floor(Math.random() * this.numCharts.length)],
            data: [
                50, 10, 40, 95, 4, 24, null, 85, undefined, 0, 35, 53
            ],
            months: [ 
                'Jan', 
                'Fev', 
                'Mar', 
                'Abr', 
                'Mai', 
                'Jun', 
                'Jul', 
                'Ago', 
                'Set', 
                'Out', 
                'Nov', 
                'Dez'
            ]
        };
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onPressEnter() {
        this.setState({ loadingOn: true });
        if (!this.openViewLogin) {
            this.onAnimFormServer(false);
        }
        setTimeout(() => {
            this.setState({ loadingOn: false });
            setStorageKey('userLogin', this.props.userLogin);
            setStorageKey('userPass', this.props.userPass);
            Actions.mainTabBar();
        }, 3000);
    }

    onAnimFormLogin(up = false, isKeyboardEvent = false, callAnimServer = false) {
        if (up) {
            if (Platform.OS === 'ios') {
                this.setState({ 
                    marginTop: 60, 
                    marginBottom: this.keyboardHeight - 60,
                    changedLayoutServer: isKeyboardEvent
                });
            } else {
                this.setState({ 
                    marginTop: 50, 
                    marginBottom: 0, 
                    changedLayoutServer: isKeyboardEvent
                });
            }
            
            this.openViewLogin = true;

            Animated.parallel([
                Animated.spring(
                    this.state.animCard,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                ),
                Animated.spring(
                    this.state.animChart,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ], { useNativeDriver: true }).start(() => {
                if (this.state.chartChoosed === 'bar') {
                    this.setState({ chartChoosed: 'area' });
                } else {
                    this.setState({ chartChoosed: 'bar' });
                }
            });
        } else {
            this.setState({ 
                marginTop: 0, 
                marginBottom: 0,
                changedLayoutServer: isKeyboardEvent 
            });

            this.openViewLogin = false;

            Animated.parallel([
                Animated.spring(
                    this.state.animCard,
                    {
                        toValue: this.state.viewCardFields,
                        useNativeDriver: true
                    }
                ),
                Animated.spring(
                    this.state.animChart,
                    {
                        toValue: 1,
                        useNativeDriver: true
                    }
                )
            ], { useNativeDriver: true }).start(() => {
                if (callAnimServer) {
                    this.onAnimFormServer(true);
                }
            });
        }
    }

    onAnimFormServer(up = false, isKeyboardEvent = false) {
        this.doResetUrlServer();

        if (up) {
            if (Platform.OS === 'ios') {
                this.setState({ 
                    marginTop: 60, 
                    marginBottom: this.keyboardHeight - 60,
                    changedLayoutServer: isKeyboardEvent
                });
            } else {
                this.setState({ 
                    marginTop: 50, 
                    marginBottom: 0,
                    changedLayoutServer: isKeyboardEvent
                });
            }

            this.openViewServer = true;

            Animated.parallel([
                Animated.spring(
                    this.state.animCardServer,
                    {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 0
                    }
                ),
                Animated.spring(
                    this.state.animChart,
                    {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 0
                    }
                )
            ], { useNativeDriver: true }).start(() => {
                if (this.state.chartChoosed === 'bar') {
                    this.setState({ chartChoosed: 'area' });
                } else {
                    this.setState({ chartChoosed: 'bar' });
                }
            });
        } else {
            this.setState({ 
                marginTop: 0, 
                marginBottom: 0, 
                changedLayoutServer: isKeyboardEvent 
            });
            this.openViewServer = false;
            Animated.parallel([
                Animated.spring(
                    this.state.animCardServer,
                    {
                        toValue: this.state.viewCardFields,
                        useNativeDriver: true
                    }
                ),
                Animated.spring(
                    this.state.animChart,
                    {
                        toValue: 1,
                        useNativeDriver: true
                    }
                )
            ], { useNativeDriver: true }).start();
        }
    }

    doResetUrlServer() {
        try {
            const asyncFun = async () => {
                const value = await AsyncStorage
                .getItem(getUIDKey('urlServer'));
                if (value) {
                    this.props.modifyUrlServer(value);
                } else {
                    this.props.modifyUrlServer('');
                }
            };

            asyncFun();
        } catch (e) {
            console.error(
                'falha ao buscar url atraves do storage.'
            );
        }
    }

    keyboardShow(e) {
        if (this.serverNoFocused) {
            this.keyboardHeight = e.endCoordinates.height;
            this.onAnimFormLogin(true, true);
        }
    }
    
    keyboardHide() {
        if (this.serverNoFocused) {
            this.onAnimFormLogin(false, true);
        }
        this.serverNoFocused = true;
    }

    renderBarChart() {
        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        );

        return (
            <BarChart
                style={{ flex: 1, marginLeft: 16 }}
                data={this.state.data}
                svg={{ 
                    strokeWidth: 2,
                    fill: 'url(#gradient)' 
                }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid
                    svg={{
                        stroke: 'grey'
                    }}
                />
                <Gradient />
            </BarChart>
        );
    }

    renderStackedAreaChart() {
        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ];

        const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
        const keys = ['apples', 'bananas', 'cherries', 'dates'];

        return (
            <StackedAreaChart
                style={{ height: 180, paddingVertical: 16, paddingLeft: 16 }}
                data={data}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
            />
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <Animated.View
                        style={{
                            flex: 1.8,
                            opacity: this.state.animChart.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                                extrapolate: 'clamp'
                            })
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal: 15, 
                                flexDirection: 'row',
                                height: 200
                            }}
                        >
                            <YAxis
                                style={{ paddingBottom: 16 }}
                                data={this.state.data}
                                contentInset={{ top: 20, bottom: 20 }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={value => `${value}%`}
                            />
                            <View style={{ flex: 1 }}>
                                { 
                                    this.state.chartChoosed === 'bar' ? 
                                    (this.renderBarChart()) 
                                    : 
                                    (this.renderStackedAreaChart())
                                }
                                <XAxis
                                    style={{ marginLeft: 16 }}
                                    data={this.state.data}
                                    formatLabel={(value, index) => this.state.months[index]}
                                    contentInset={{ left: 10, right: 10 }}
                                    svg={{ fontSize: 10, fill: 'grey' }}
                                />
                            </View>
                        </View>
                    </Animated.View>
                    <View 
                        style={{ flex: 3, zIndex: 0 }} 
                        onLayout={
                            event => {
                                if (this.changedLayout) {
                                    const viewHeight = event.nativeEvent.layout.y;
                                    this.state.animCardServer.setValue(viewHeight);
                                    Animated.spring(
                                        this.state.animCard,
                                        {
                                            toValue: viewHeight,
                                            useNativeDriver: true
                                        }
                                    ).start(() => {
                                        this.changedLayout = false;
                                        this.setState({ 
                                            viewCardFields: viewHeight,
                                            changedLayoutServer: false 
                                        });
                                    });
                                }
                            }
                        }
                    />
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            left: 0,
                            backgroundColor: colorAppPrimary,
                            transform: [{ 
                                translateY: this.state.changedLayoutServer ? 
                                this.state.animCard : 
                                this.state.animCardServer 
                            }],
                            zIndex: 1
                        }}
                    >
                        <Card
                            containerStyle={{
                                backgroundColor: colorAppPrimary,
                                paddingHorizontal: 15,
                                paddingTop: 40,
                                borderWidth: 0
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => this.urlServerRef.focus()}
                            >
                                <View style={[styles.viewField, { flex: 1 }]}>
                                    <Icon
                                        iconStyle={{ marginBottom: 6, marginLeft: 3 }}
                                        color={'white'}
                                        name='server-network'
                                        type='material-community'
                                        size={30}
                                    />
                                    <FormInput
                                        ref={ref => (this.urlServerRef = ref)}
                                        onFocus={() => (this.serverNoFocused = false)}
                                        onChangeText={() => true}
                                        containerStyle={styles.formInputContainer}
                                        returnKeyType={'next'}
                                        inputStyle={styles.input}
                                        placeholder={'Endereço do servidor'}
                                        placeholderTextColor={'grey'}
                                        autoCapitalize={'none'}
                                        value={this.props.urlServer}
                                        onChangeText={(value) => this.props.modifyUrlServer(value)}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            try {
                                                AsyncStorage.setItem(
                                                    getUIDKey('urlServer'),
                                                    this.props.urlServer
                                                );
                                                this.onAnimFormServer(false);
                                            } catch (e) {
                                                console.log('falha ao salvar url');
                                            }
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View 
                                style={{ 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Button
                                        small
                                        rounded
                                        outline
                                        title={'Salvar'}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            try {
                                                AsyncStorage.setItem(
                                                    getUIDKey('urlServer'),
                                                    this.props.urlServer
                                                );
                                                this.onAnimFormServer(false);
                                            } catch (e) {
                                                console.log('falha ao salvar url');
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        small
                                        rounded
                                        outline
                                        title={'Cancelar'}
                                        onPress={() => {
                                            this.onAnimFormServer(false);
                                            this.doResetUrlServer();
                                        }}
                                    />
                                </View>
                            </View>
                        </Card>
                    </Animated.View>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            left: 0,
                            backgroundColor: colorAppPrimary,
                            transform: [{ translateY: this.state.animCard }],
                            zIndex: 2
                        }}
                    >
                        <Card
                            containerStyle={styles.card}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => this.userLoginRef.focus()}
                            >
                                <View style={styles.viewField}>
                                    <Icon
                                        iconStyle={{ marginBottom: 6, marginLeft: 3 }}
                                        color={'white'}
                                        name='account-outline'
                                        type='material-community'
                                        size={34}
                                    />
                                    <FormInput
                                        ref={ref => (this.userLoginRef = ref)}
                                        containerStyle={styles.formInputContainer}
                                        returnKeyType={'next'}
                                        inputStyle={styles.input}
                                        placeholder={'Usuário'}
                                        placeholderTextColor={'grey'}
                                        autoCapitalize={'none'}
                                        value={this.props.userLogin}
                                        onChangeText={(value) => this.props.modifyUserLogin(value)} 
                                        onSubmitEditing={
                                            () => this.userPassRef.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => this.userPassRef.focus()}
                            >
                                <View style={styles.viewField}>
                                    <TouchableWithoutFeedback
                                        onPress={
                                            () => 
                                            this.setState(
                                                { 
                                                    inputUserPasswordEye: 
                                                    !this.state.inputUserPasswordEye 
                                                }
                                            )
                                        }
                                    >
                                        <Icon
                                            iconStyle={{
                                                marginBottom: 8, 
                                                marginLeft: 5,
                                                marginRight: 2 
                                            }}
                                            color={'white'}
                                            name={
                                                this.state.inputUserPasswordEye ? 
                                                'lock-outline' : 'lock-open-outline'
                                            }
                                            type='material-community'
                                            size={30}
                                        />
                                    </TouchableWithoutFeedback>
                                    <FormInput
                                        ref={ref => (this.userPassRef = ref)}
                                        containerStyle={styles.formInputContainer}
                                        inputStyle={styles.input}
                                        placeholder={'Senha'}
                                        placeholderTextColor={'grey'}
                                        secureTextEntry={this.state.inputUserPasswordEye}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        value={this.props.userPass}
                                        onChangeText={(value) => this.props.modifyUserPass(value)} 
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            this.onPressEnter();
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{ marginTop: 40 }}>
                                <Button
                                    small
                                    rounded
                                    outline
                                    disabled={this.state.loadingOn}
                                    disabledStyle={{ 
                                        borderColor: '#4E5576', 
                                        backgroundColor: 'transparent' 
                                    }}
                                    loading={this.state.loadingOn}
                                    title={this.state.loadingOn ? ' ' : 'Entrar'}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        this.onPressEnter();
                                    }}
                                />
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        if (this.openViewLogin) {
                                            this.onAnimFormLogin(false, false, true);
                                        } else if (this.openViewServer) {
                                            this.onAnimFormServer(false);
                                        } else {
                                            this.onAnimFormServer(true);
                                        }
                                    }}
                                >
                                    <Text 
                                        style={{ 
                                            marginTop: 15,
                                            color: 'grey', 
                                            textAlign: 'center' 
                                        }}
                                    >
                                        Alterar servidor
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </Card>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colorAppPrimary,
        paddingTop: 20
    },
    card: {
        borderRadius: 3,
        borderColor: 'white',
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
        paddingTop: 20
    },
    text: {
        color: 'white'
    },
    viewField: { 
        flexDirection: 'row', 
        alignItems: 'flex-end',
        borderBottomWidth: 1, 
        borderBottomColor: 'white',
        marginBottom: 5,
        padding: 5
    },
    input: {
        paddingBottom: 0,
        color: 'white',
        height: 35,
        width: null
    },
    formInputContainer: {
        height: Platform.OS === 'android' ? 45 : 40,
        marginVertical: 5,
        paddingRight: 25
    }
});

const mapStateToProps = (state) => ({
    urlServer: state.LoginReducer.urlServer,
    userLogin: state.LoginReducer.userLogin,
    userPass: state.LoginReducer.userPass
});

export default connect(mapStateToProps, {
    modifyUrlServer,
    modifyUserLogin,
    modifyUserPass
})(Login);

