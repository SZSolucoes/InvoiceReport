import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import normalize from 'normalize-strings';
import CardWithChart from './CardWithChart';
import { colorAppProjecao } from '../../utils/constants';
import { modifyReportFilterLoading } from '../../actions/ReportActions';

class Projecao extends React.Component {
    constructor(props) {
        super(props);

        this.dataLength = 0;

        this.dataSourceControl = this.dataSourceControl.bind(this);
        this.renderProjecaoCards = this.renderProjecaoCards.bind(this);
        this.filtredDataSourceControl = this.filtredDataSourceControl.bind(this);
    }

    dataSourceControl(reportData, reportSelected, reportFilterStr) {
        if (reportData && reportData[reportSelected] && reportData[reportSelected].projecao) {
            const projecaoData = reportData[reportSelected].projecao;
            this.dataLength = projecaoData.length;
            if (reportFilterStr) {
                const filtredData = this.filtredDataSourceControl(
                    projecaoData, reportFilterStr
                );
                
                if (filtredData && filtredData.length === 0) {
                    setTimeout(() => this.props.modifyReportFilterLoading(
                        { ...this.props.reportFilterLoading, projecao: false }
                    ), 100);
                }

                return filtredData;
            }
            setTimeout(() => this.props.modifyReportFilterLoading(
                { ...this.props.reportFilterLoading, projecao: false }
            ), 100);
            return projecaoData;
        }

        setTimeout(() => this.props.modifyReportFilterLoading(
            { ...this.props.reportFilterLoading, projecao: false }
        ), 100);
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

    renderProjecaoCards({ item, index }) {
        if (index === this.dataLength - 1) {
            setTimeout(() => this.props.modifyReportFilterLoading(
                { ...this.props.reportFilterLoading, projecao: false }
            ), 100);
        }
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
    reportFilterStr: state.ReportReducer.reportFilterStr,
    reportFilterLoading: state.ReportReducer.reportFilterLoading
});

export default connect(mapStateToProps, { modifyReportFilterLoading })(Projecao);

