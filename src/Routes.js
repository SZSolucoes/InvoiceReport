import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { 
    StyleSheet,
    View,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

import Login from './components/login/Login';

class Routes extends React.Component {

    constructor(props) {
        super(props);

        this.renderRouter = this.renderRouter.bind(this);
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
                </Scene>
            </Router>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderRouter()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'blue',
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

