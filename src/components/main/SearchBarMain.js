import React from 'react';
import { 
    Animated, 
    View,
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { modifyShowSearchBarMain } from '../../actions/EventsActions';
import { colorAppPrimary } from '../../utils/constants';

class SearchBarMain extends React.Component {

    constructor(props) {
        super(props);

        this.startShowSearchAnim = this.startShowSearchAnim.bind(this);

        this.mainViewHeight = 75;
        
        this.state = {
            animSearchBarValue: new Animated.Value(Dimensions.get('window').height)
        };
    }

    componentDidMount() {
        console.log('searchbar montou');
    }

    shouldComponentUpdate(nextProps, nextStates) {
        console.log(nextProps.showSearchBarMain);
        console.log(this.props.showSearchBarMain);
        if (nextProps.showSearchBarMain !== this.props.showSearchBarMain) {
            this.startShowSearchAnim(nextProps.showSearchBarMain);
        }
    
        return nextProps !== this.props || nextStates !== this.state;
    }

    startShowSearchAnim(showSearchBar) {
        if (showSearchBar) {
            Animated.spring(
                this.state.animSearchBarValue,
                {
                    toValue: Dimensions.get('window').height - this.mainViewHeight,
                    bounciness: 0,
                    useNativeDriver: true
                }
            ).start();
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

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: this.mainViewHeight,
                    transform: [{ translateY: this.state.animSearchBarValue }],
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
                }}
            >
                <View style={styles.mainView}>
                    <View style={{ flex: 0.5 }} />
                    <View style={{ flex: 2 }}>
                        <SearchBar
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            //onFocus={() => this.props.modificaAnimatedHeigth(1)}
                            //onBlur={() => this.props.modificaAnimatedHeigth(false)}
                            //clearIcon={!!this.props.filterStr}
                            /*showLoadingIcon={
                                this.props.listJogos &&
                                this.props.listJogos.length > 0 && 
                                this.props.filterLoad
                            }*/
                            containerStyle={{ 
                                backgroundColor: 'transparent',
                                borderTopWidth: 0, 
                                borderBottomWidth: 0
                            }}
                            searchIcon={{ size: 24 }}
                            //value={this.props.filterStr}
                            onChangeText={(value) => {
                                //this.props.modificaFilterStr(value);
                                //this.props.modificaFilterLoad(true);
                            }}
                            //onClear={() => this.props.modificaFilterStr('')}
                            placeholder='Buscar jogo...'
                        />
                    </View>
                    <View style={{ flex: 0.5 }} />
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colorAppPrimary
    }
});

const mapStateToProps = (state) => ({
    showSearchBarMain: state.EventsReducer.showSearchBarMain
});

export default connect(mapStateToProps, {
    modifyShowSearchBarMain
}, null, { withRef: true })(SearchBarMain);

