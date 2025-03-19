import { React, useEffect } from "react";
import Plot from "react-plotly.js";

const DynamicSubPlot = function ({
    data,
    subplots
}) {
    const time = ['2025-01-02', '2025-01-01', '2025-01-03', '2025-01-04', '2025-01-05'];
    const series1 = [10, 15, 13, 18, 25];
    const series2 = [5, 6, 8, 7, 10];
    const series3 = [12, 14, 16, 18, 20];

    const testdata = [
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

    const layout = {
        grid: { rows: subplots?.length, columns: 1, subplots: subplots, pattern: "independent", roworder: "top to bottom", height: '1024px' },
        title: `${subplots?.length} Time Series on a Common X-Axis`,
    };
    const layout2 = {
        grid: { rows: 3, columns: 1, subplots: [['xy'], ['xy2'], ['xy3']], pattern: "independent", roworder: "top to bottom" },
        title: `3 Time Series on a Common X-Axis`,
    };

    useEffect(() => {
        console.log("data : ");
        console.log(data);
        console.log("layout :");
        console.log(layout);
    }, [data, layout]);

    return (
        <div>
            <h2>Dynamic SubPlot</h2>
            <Plot
                data={data}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '3024px' }}
            />
            <h2>Demo Subplot</h2>
            <Plot
                data={testdata}
                layout={layout2}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default DynamicSubPlot;