import logo from './logo.svg';
import './App.css';
import DynamicSubPlot from './components/DynamicPlots';
import { Button } from 'antd';
import { theme, Layout, Form, Select, message, Upload } from "antd";
import { useState, useEffect } from 'react';
// import Papa from 'papaparse';
import dummy_data from './dummy_data';
import dummy_data_2 from './dummy_data_2';
import banas_data from './banas_vat_data_june_dec_2024';
import output_data from './output';

const { Header, Content, Footer } = Layout;

const App = () => {
    const [subplots, setSubplots] = useState([]);
    const [plotData, setPlotData] = useState([]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        // dummy_data.map((val)=>{
        //     console.log(val.DateTime, val.VatNo, val.Temperature_of_Milk_in_vat);
        // })
        createPlottingData(output_data);
    }, [output_data]);

    const createPlottingData = (data) => {
        if (!data.length) {
            return;
        }
        let _timeseries = [];
        let _plotConfig = {};
        data.map((row) => {
            // `DateTime` - is the col used for plotting the X-axis values.
            // `Temperature_of_Milk_in_vat` - is the col used for plotting the Y-axis values for all plots.
            // `VatNo` - is the col used for filtering the plots.

            // Collect datetime values.
            _timeseries.push(row.DateTime);

            if (_plotConfig.hasOwnProperty(row.VatNo)) {
                _plotConfig[row.VatNo] = {
                    "DateTime": [..._plotConfig[row.VatNo].DateTime, row.DateTime],
                    "Temperature_of_Milk_in_vat": [..._plotConfig[row.VatNo].Temperature_of_Milk_in_vat, row.Temperature_of_Milk_in_vat]
                };
            } else {
                _plotConfig[row.VatNo] = {
                    "DateTime": [row.DateTime],
                    "Temperature_of_Milk_in_vat": [row.Temperature_of_Milk_in_vat]
                };
            }
        });
        const _plotdata = [];
        const _subplots = [];
        Object.entries(_plotConfig).map(([ind, val]) => {
            const index = ind + 1;
            _plotdata.push(
                {
                    x: val.DateTime,
                    y: val.Temperature_of_Milk_in_vat,
                    type: 'line',
                    mode: 'lines+markers',
                    xaxis: 'x',
                    yaxis: `y${parseInt(ind+1)}`,
                    title: `Vat No ${index} Graph`
                }
            );
            _subplots.push([`xy${index}`]);
        });
        setSubplots(_subplots)
        setPlotData(_plotdata)
    }

    const handleOnFinish = (values) => {
        console.log(`Submitted Successfully: `, values);
        // console.log(timeseries);
        // console.log(plotConfig);
        // Get time col values
        // setTimeSeries(time);

        // // Get all plotY col values
        // const plotValues = [10, 15, 13, 18, 25, 5, 6, 8, 7, 10, 12, 14, 16, 18, 20];
        // const filterValues = ['series1', 'series2', 'series3'];

        // let _series = [];
        // filterValues.map((val) => {
        //     // Get all values of plotX col in original data with plotFilter col set to `val`
        //     _series.push(
        //         getFilteredColValues(fileData, plotY, val)
        //     );
        // });
        // // setSeries(_series);

    }

    const getFilteredColValues = (data, col, filterCol) => {
        return [];
    }
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                    // height: '1024px'
                }}
            >
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Button>SubPlot</Button>
                    <Form
                        name='subplot_config_form'
                        onFinish={handleOnFinish}
                    >
                        <Form.Item
                            label="Select DateTime"
                        >
                            <Select>
                                <Select.Option value="DateTime">DateTime</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Select Plot Data"
                        >
                            <Select>
                                <Select.Option value="MilkTemp">Milk Temperature</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Select Plot Filter"
                        >
                            <Select>
                                <Select.Option value="VatNo">Vat No</Select.Option>
                                <Select.Option value="ContainerNo">Container No</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={null}
                        >
                            <Button type='primary' htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                    <DynamicSubPlot data={plotData} subplots={subplots} />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Footer
            </Footer>
        </Layout >
    );
}

export default App;
