import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data, options, width = 800 }) => {

    const defaultOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: `${width}px` }}>
            <Bar data={data} options={{ ...defaultOptions, ...options }} />
        </div>
    );
};

export default BarChart;
