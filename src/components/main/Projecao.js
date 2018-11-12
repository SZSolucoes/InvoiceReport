import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import CardWithChart from './CardWithChart';
import { colorAppProjecao } from '../../utils/constants';

class Projecao extends React.Component {
    constructor(props) {
        super(props);

        this.dataSourceControl = this.dataSourceControl.bind(this);
        this.renderProjecaoCards = this.renderProjecaoCards.bind(this);
    }

    dataSourceControl(reportData, reportSelected) {
        if (reportData && reportData[reportSelected] && reportData[reportSelected].projecao) {
            return reportData[reportSelected].projecao;
        }

        return [];
    }

    renderProjecaoCards({ item, index }) {
        return (
            <CardWithChart 
                index={index}
                item={item}
                chartType={'bar'}
                gradientColor={colorAppProjecao}
            />
        );
    }

    render() {
        return (
            <FlatList 
                ref={(ref) => { this.scrollViewRef = ref; }}
                data={
                    this.dataSourceControl(
                        this.props.reportData,
                        this.props.reportSelected, 
                        this.props.reportFilterStr
                    )
                }
                renderItem={this.renderProjecaoCards}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={(<View style={{ marginVertical: 50 }} />)}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    reportData: state.ReportReducer.reportData,
    reportSelected: state.ReportReducer.reportSelected,
    reportFilterStr: state.ReportReducer.reportFilterStr
});

export default connect(mapStateToProps, {})(Projecao);

