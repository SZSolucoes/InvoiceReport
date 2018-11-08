import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, /*TouchableOpacity*/ } from 'react-native';
import { Card, Divider, /*Icon*/ } from 'react-native-elements';
import { AreaChart, BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import { colorAppPrimary } from '../../utils/constants';

class CardWithChart extends React.Component {

    constructor(props) {
        super(props);

        this.renderChartType = this.renderChartType.bind(this);
        this.renderAreaChart = this.renderAreaChart.bind(this);
        this.renderBarChart = this.renderBarChart.bind(this);
        this.changeChartType = this.changeChartType.bind(this);

        this.state = {
            chartType: this.props.chartType ? this.props.chartType : 'bar',
            chartPos: 1
        };

        this.charts = [
            { key: 'area', label: 'Área' },
            { key: 'bar', label: 'Barras' },
            { key: 'pie', label: 'Pizza' },
        ];
    }

    changeChartType(direction) {
        if (direction === 'left') {
            let newPos = this.state.chartPos - 1;
            if (newPos < 0) {
                newPos = this.charts.length - 1;
            }
            this.setState({ chartType: this.charts[newPos].key, chartPos: newPos });
        } else if (direction === 'right') {
            let newPos = this.state.chartPos + 1;
            if (newPos > this.charts.length - 1) {
                newPos = 0;
            }
            this.setState({ chartType: this.charts[newPos].key, chartPos: newPos });
        }
    }

    renderAreaChart(data, labels) {
        return (
            <View
                style={{
                    paddingHorizontal: 15, 
                    flexDirection: 'row',
                    height: 200
                }}
            >
                <YAxis
                    style={{ paddingBottom: 16 }}
                    data={data}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={value => value}
                />
                <View style={{ flex: 1 }}>
                    <AreaChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={data}
                        svg={{ 
                            strokeWidth: 2,
                            fill: 'rgba(0, 0, 98, 0.8)' 
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}
                    >
                        <Grid
                            svg={{
                                stroke: 'grey'
                            }}
                        />
                    </AreaChart>
                    <XAxis
                        style={{ marginLeft: 16 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        contentInset={{ left: 20, right: 25 }}
                        svg={{ fontSize: 10, fill: 'black', fontWeight: 'bold' }}
                    />
                </View>
            </View>
        );
    }

    renderBarChart(data, labels) {
        const { gradientColor } = this.props;

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={gradientColor || colorAppPrimary} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        );

        return (
            <View
                style={{
                    paddingRight: 15, 
                    flexDirection: 'row',
                    height: 200
                }}
            >
                <YAxis
                    style={{ paddingBottom: 16 }}
                    data={data}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={value => value}
                />
                <View style={{ flex: 1 }}>
                    <BarChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={data}
                        svg={{ 
                            strokeWidth: 2,
                            fill: 'url(#gradient)' 
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid
                            svg={{
                                stroke: 'grey'
                            }}
                        />
                        <Gradient />
                    </BarChart>
                    <XAxis
                        style={{ marginLeft: 16 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        contentInset={{ left: 20, right: 25 }}
                        svg={{ fontSize: 10, fill: 'black', fontWeight: 'bold' }}
                    />
                </View>
            </View>
        );
    }

    renderChartType(chartType, data, labels) {
        switch (chartType) {
            case 'bar':
                return this.renderBarChart(data, labels);
            case 'area':
                return this.renderAreaChart(data, labels);
            default:
                return this.renderBarChart(data, labels);
        }
    }

    render() {
        const { item, index, gradientColor } = this.props;
        const name = item.key ? item.key : '';
        const bruto = item.bruto ? item.bruto : 0;
        const liquido = item.liquido ? item.liquido : 0;
        const devolucao = item.devolucao ? item.devolucao : 0;
        const margem = item.margem ? item.margem : 0;
        const data = [bruto, liquido, devolucao];
        const labels = ['Bruto', 'Líquido', 'Devolução'];

        return (
            <Card
                key={index}
                containerStyle={styles.card}
            >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{ 
                                    fontSize: 20, 
                                    color: 'black', 
                                    fontWeight: '500' 
                                }}
                            >
                                {name}
                            </Text>
                        </View>
                        {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.changeChartType('left')}
                            >
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        color={colorAppPrimary}
                                        name={'chevron-left'}
                                        type='material-community'
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center' }}>
                                    {this.charts[this.state.chartPos].label}
                                </Text>  
                            </View>
                            <TouchableOpacity
                                onPress={() => this.changeChartType('right')}
                            >
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        color={colorAppPrimary}
                                        name={'chevron-right'}
                                        type='material-community'
                                        size={30}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <Divider style={{ marginVertical: 5 }} />
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flex: 1 }}>
                            {this.renderChartType(
                                this.state.chartType, 
                                data, 
                                labels
                            )}
                        </View>
                        <View 
                            style={{ 
                                flex: 0.5, 
                                justifyContent: 'space-between', 
                                paddingLeft: 20 
                            }}
                        >
                            <View>
                                <Text 
                                    style={[styles.textLabel, { color: gradientColor || 'black' }]}
                                >
                                    Bruto
                                </Text>
                                <Text style={styles.textValue}>{bruto}</Text>
                            </View>
                            <View>
                                <Text 
                                    style={[styles.textLabel, { color: gradientColor || 'black' }]}
                                >
                                    Líquido
                                </Text>
                                <Text style={styles.textValue}>{liquido}</Text>
                            </View>
                            <View>
                                <Text 
                                    style={[styles.textLabel, { color: gradientColor || 'black' }]}
                                >
                                    Devolução
                                </Text>
                                <Text style={styles.textValue}>{devolucao}</Text>
                            </View>
                            <View>
                                <Text 
                                    style={[styles.textLabel, { color: gradientColor || 'black' }]}
                                >
                                    Margem
                                </Text>
                                <Text style={styles.textValue}>{margem}%</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 3,
        marginHorizontal: 5,
        marginVertical: 15,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    textLabel: { 
        fontWeight: '600' 
    },
    textValue: {
        color: 'black', 
        fontWeight: '500',
        fontSize: 16
    }
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(CardWithChart);

