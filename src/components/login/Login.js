
import React from 'react';
import { 
    View,
    StyleSheet, 
    StatusBar, 
    TouchableWithoutFeedback, 
    Keyboard,
    Platform,
    Animated
} from 'react-native';
import { Card, Icon, FormInput, Button } from 'react-native-elements';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import { colorAppPrimary, colorAppSecondary } from '../../utils/constants';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.changedLayout = true;

        StatusBar.setBackgroundColor(colorAppPrimary, true);

        this.onPressEnter = this.onPressEnter.bind(this);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);

        this.state = {
            inputUserPasswordEye: true,
            marginTop: 0,
            marginBottom: 0,
            animChart: new Animated.Value(1),
            animCard: new Animated.Value(0),
            viewCardFields: 0,
            loadingOn: false,
            data: [
                50, 10, 40, 95, 4, 24, null, 85, undefined, 0, 35, 53
            ]
        };
    }

    onPressEnter() {
        this.setState({ loadingOn: true });
        setTimeout(() => {
            this.setState({ loadingOn: false });
            // Actions...
        }, 3000);
    }

    keyboardShow(e) {
        if (Platform.OS === 'ios') {
            this.setState({ 
                marginTop: 60, 
                marginBottom: e.endCoordinates.height - 60 
            });
        } else {
            this.setState({ marginTop: 50, marginBottom: 0 });
        }

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
        ], { useNativeDriver: true }).start();
    }
    
    keyboardHide() {
        this.setState({ marginTop: 0, marginBottom: 0 });
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
        ], { useNativeDriver: true }).start();
    }

    render() {
        const contentInset = { top: 20, bottom: 20 };
        const months = [ 
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
        ];

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <Animated.View
                        style={{
                            flex: 1.7,
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
                                height: 200,
                            }}
                        >
                            <YAxis
                                data={this.state.data}
                                contentInset={contentInset}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={value => `${value}%`}
                            />
                            <View style={{ flex: 1 }}>
                                <BarChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={this.state.data}
                                    svg={{ fill: colorAppSecondary }}
                                    contentInset={contentInset}
                                >
                                    <Grid
                                        svg={{
                                            stroke: 'grey'
                                        }}
                                    />
                                </BarChart>
                                <XAxis
                                    style={{ marginLeft: 16 }}
                                    data={this.state.data}
                                    formatLabel={(value, index) => months[index]}
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
                                    Animated.spring(
                                        this.state.animCard,
                                        {
                                            toValue: event.nativeEvent.layout.y,
                                            useNativeDriver: true
                                        }
                                    ).start();
                                    this.changedLayout = false;
                                    this.setState({ viewCardFields: event.nativeEvent.layout.y });
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
                            transform: [{ translateY: this.state.animCard }],
                            zIndex: 1
                        }}
                    >
                        <Card
                            containerStyle={styles.card}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => this.userNameFieldRef.focus()}
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
                                        ref={ref => { this.userNameFieldRef = ref; }}
                                        onChangeText={() => true} 
                                        containerStyle={styles.formInputContainer}
                                        returnKeyType={'next'}
                                        inputStyle={styles.input}
                                        placeholder={'Usuário'}
                                        placeholderTextColor={'#4E5576'}
                                        onSubmitEditing={
                                            () => this.userPasswordFieldRef.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => this.userPasswordFieldRef.focus()}
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
                                        ref={ref => { this.userPasswordFieldRef = ref; }}
                                        onChangeText={() => true} 
                                        containerStyle={styles.formInputContainer}
                                        inputStyle={styles.input}
                                        placeholder={'Senha'}
                                        placeholderTextColor={'#4E5576'}
                                        secureTextEntry={this.state.inputUserPasswordEye}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            this.onPressEnter();
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{ marginVertical: 40 }}>
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

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(Login);

