import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import CardWithChart from './CardWithChart';
import { colorAppAcumulado } from '../../utils/constants';

class Acumulado extends React.Component {
    constructor(props) {
        super(props);

        this.dataSourceControl = this.dataSourceControl.bind(this);
        this.renderAcumuladoCards = this.renderAcumuladoCards.bind(this);
    }

    dataSourceControl(reportData, reportSelected) {
        if (reportData && reportData[reportSelected] && reportData[reportSelected].acumulado) {
            return reportData[reportSelected].acumulado;
        }

        return [];
    }

    renderAcumuladoCards({ item, index }) {
        return (
            <CardWithChart 
                index={index}
                item={item}
                chartType={'bar'}
                gradientColor={colorAppAcumulado}
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
                renderItem={this.renderAcumuladoCards}
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

export default connect(mapStateToProps, {})(Acumulado);

