import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';

class Acumulado extends React.Component {
    render() {
        return (
            <FlatList />
        );
    }
}

export default connect()(Acumulado);

