import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import normalize from 'normalize-strings';
import CardWithChart from './CardWithChart';
import { colorAppDiario } from '../../utils/constants';
import { modifyReportFilterLoading } from '../../actions/ReportActions';

class Diario extends React.Component {

    constructor(props) {
        super(props);

        this.dataLength = 0;

        this.dataSourceControl = this.dataSourceControl.bind(this);
        this.renderDiarioCards = this.renderDiarioCards.bind(this);
        this.filtredDataSourceControl = this.filtredDataSourceControl.bind(this);
    }

    dataSourceControl(reportData, reportSelected, reportFilterStr) {
        if (reportData && reportData[reportSelected] && reportData[reportSelected].diario) {
            const diarioData = reportData[reportSelected].diario;
            this.dataLength = diarioData.length;
            if (reportFilterStr) {
                return this.filtredDataSourceControl(
                    diarioData, reportFilterStr
                );
            }
            setTimeout(() => this.props.modifyReportFilterLoading(false), 1000);
            return diarioData;
        }

        setTimeout(() => this.props.modifyReportFilterLoading(false), 1000);
        return [];
    }

    filtredDataSourceControl(data, filter) {
        const dataFiltred = _.filter(
            data, (item) => item.key && 
            normalize(item.key).toLowerCase().includes(
                normalize(filter).toLowerCase()
            )
        );
        this.dataLength = dataFiltred.length;
        
        return dataFiltred;
    }

    renderDiarioCards({ item, index }) {
        if (index === this.dataLength - 1) {
            setTimeout(() => this.props.modifyReportFilterLoading(false), 1000);
        }
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

export default connect(mapStateToProps, { modifyReportFilterLoading })(Diario);

