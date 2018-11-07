import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';

class Diario extends React.Component {

    componentDidMount() {
        console.log('Diario montou');
    }

    render() {
        console.log('Diario renderizou');
        return (
            <FlatList />
        );
    }
}

export default connect()(Diario);

