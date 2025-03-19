import React from "react";
import Plot from "react-plotly.js";
import { Layout, Data } from "plotly.js";

interface DynamicSubPlotProps {
    data: any[];
}
const DynamicSubPlot: React.FC<DynamicSubPlotProps> = () => {
    const time: string[] = ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'];
    const series1: number[] = [10, 15, 13, 18, 25];
    const series2: number[] = [5, 6, 8, 7, 10];
    const series3: number[] = [12, 14, 16, 18, 20];

    const testdata: Data[] = [
        {
            x: time,
            y: series1,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Series 1',
            line: { color: 'blue' }
        },
        {
            x: time,
            y: series2,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Series 3',
            line: { color: 'green' },
            xaxis: 'x',
            yaxis: 'y2'
        },
        {
            x: time,
            y: series3,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Series 4',
            line: { color: 'orange' },
            xaxis: 'x',
            yaxis: 'y3'
        },
    ];

    const layout: Layout = {
        grid: { rows: 3, columns: 1, subplots: ['xy', 'xy2', 'xy3'], pattern: "independent", roworder: "top to bottom" },
        title: 'Three Time Series on a Common X-Axis',
    };

    return (
        <div>
            <h2>Dynamic SubPlot</h2>
            <Plot
                data={testdata}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default DynamicSubPlot;
