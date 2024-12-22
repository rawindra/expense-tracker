import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options, height = 400 }) => {

    const defaultOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "right" },
            tooltip: { enabled: true },
        },
    };

    return (
        <div style={{ height: `${height}px` }}>
            <Pie data={data} options={{ ...defaultOptions, ...options }} />;
        </div>
    )
};

export default PieChart;
