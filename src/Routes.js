import React from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import { 
    StyleSheet,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import NavBarRightBtns from './components/main/NavBarRightBtns';
import SearchBarMain from './components/main/SearchBarMain';
import SideMenu from './components/main/SideMenu';
import FadeScreenAnim from './components/main/FadeScreenAnim';
import Login from './components/login/Login';
import Diario from './components/main/Diario';
import Acumulado from './components/main/Acumulado';
import Projecao from './components/main/Projecao';

import { store } from './App';
import { colorAppSecondary, colorAppPrimary, getMenuName } from './utils/constants';

class Routes extends React.Component {

    constructor(props) {
        super(props);

        this.renderRouter = this.renderRouter.bind(this);
        this.renderLeftGlobalMenuBtn = this.renderLeftGlobalMenuBtn.bind(this);
    }

    renderLeftGlobalMenuBtn() {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    paddingHorizontal: 10,
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        store.dispatch({
                            type: 'modify_issidemenuopen_events',
                            payload: true
                        });
                    }}
                >
                    <Icon
                        iconStyle={{ marginHorizontal: 5 }}
                        color={'white'}
                        name='menu'
                        type='material-community'
                        size={26}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderRouter() {
        return (
            <Router backAndroidHandler={this.onBackAndroidHdl}>
                <Scene 
                    key='root'
                    navigationBarStyle={styles.header}
                >
                    <Scene 
                        key='login' 
                        component={Login}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft} 
                        initial
                        hideNavBar
                    />
                    <Scene
                        key={'mainTabBar'}
                        tabs
                        showLabel
                        tabBarPosition={'top'}
                        lazy={false}
                        swipeEnabled
                        hideNavBar={false}
                        title={getMenuName(store.getState().EventsReducer.sideMenuSelected)} 
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor={'white'}
                        tabBarStyle={{ backgroundColor: colorAppSecondary }}
                        labelStyle={{ fontFamily: 'rubik', fontWeight: 'bold' }}
                        type={ActionConst.RESET}
                        renderLeftButton={() => this.renderLeftGlobalMenuBtn()}
                        renderRightButton={<NavBarRightBtns />}
                    >
                        <Scene 
                            key={'diarioTab'}
                            hideNavBar 
                            component={Diario}
                            initial
                            tabBarLabel={'Diário'}
                            activeTintColor={'white'} 
                        />
                        <Scene 
                            key={'acumuladoTab'}
                            hideNavBar 
                            component={Acumulado}
                            tabBarLabel={'Acumulado'}
                            activeTintColor={'white'} 
                        />
                        <Scene 
                            key={'projecaoTab'}
                            hideNavBar 
                            component={Projecao}
                            tabBarLabel={'Projeção'}
                            activeTintColor={'white'} 
                        />
                    </Scene>
                </Scene>
            </Router>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderRouter()}
                <SearchBarMain zIndex={1} />
                <FadeScreenAnim zIndex={2} />
                <SideMenu zIndex={3} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colorAppPrimary,
        borderBottomWidth: 0,
        ...Platform.select({
            android: {
                elevation: 0
            },
            ios: {
                shadowOpacity: 0
            }
        })
    },
    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    btLeft: {
        color: 'white'
    }
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Routes);

