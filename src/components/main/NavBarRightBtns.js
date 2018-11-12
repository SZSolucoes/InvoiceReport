import React from 'react';
import { 
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { modifyShowSearchBarMain } from '../../actions/EventsActions';

class NavBarRightBtns extends React.Component {
    render() {
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
                    onPress={
                        () => this.props.modifyShowSearchBarMain(!this.props.showSearchBarMain)
                    }
                >
                    <Icon
                        iconStyle={{ marginHorizontal: 5 }}
                        color={'white'}
                        name={this.props.reportFilterStr ? 'filter' : 'filter-outline'}
                        type='material-community'
                        size={26}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    reportFilterStr: state.ReportReducer.reportFilterStr,
    showSearchBarMain: state.EventsReducer.showSearchBarMain,
});

export default connect(mapStateToProps, { modifyShowSearchBarMain })(NavBarRightBtns);

