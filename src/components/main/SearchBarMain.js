import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from 'react-native-searchbar';

class SearchBarMain extends React.Component {

    constructor(props) {
        super(props);

        this.onKeyboardShow = this.onKeyboardShow.bind(this);
        this.onKeyboardHide = this.onKeyboardHide.bind(this);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onKeyboardShow() {
        return;
    }

    onKeyboardHide() {
        this.searchBar.hide();
    }

    show() {
        this.searchBar.show();
    }

    render() {
        return (
            <SearchBar
                ref={ref => (this.searchBar = ref)}
                autoCapitalize={'none'}
                autoCorrect={false}
                fontSize={18}
            />
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {}, null, { withRef: true })(SearchBarMain);

