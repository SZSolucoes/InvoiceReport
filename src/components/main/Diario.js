import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import CardWithChart from './CardWithChart';
import { colorAppDiario } from '../../utils/constants';

class Diario extends React.Component {

    constructor(props) {
        super(props);

        this.dataSourceControl = this.dataSourceControl.bind(this);
        this.renderDiarioCards = this.renderDiarioCards.bind(this);
    }

    dataSourceControl(reportData, reportSelected) {
        if (reportData && reportData[reportSelected] && reportData[reportSelected].diario) {
            return reportData[reportSelected].diario;
        }

        return [];
    }

    renderDiarioCards({ item, index }) {
        return (
            <CardWithChart 
                index={index}
                item={item}
                chartType={'bar'}
                gradientColor={colorAppDiario}
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
                renderItem={this.renderDiarioCards}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={(<View style={{ marginVertical: 15 }} />)}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    reportData: state.ReportReducer.reportData,
    reportSelected: state.ReportReducer.reportSelected,
    reportFilterStr: state.ReportReducer.reportFilterStr
});

export default connect(mapStateToProps, {})(Diario);

