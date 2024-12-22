import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PieChart from './Components/PieChart';
import BarChart from './Components/BarChart';

export default function Dashboard() {

    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
    });
    const [chartData, setChartData] = useState(null);

    const fetchChartData = () => {
        const params = new URLSearchParams(filters).toString();
        if (!filters.start_date || !filters.end_date) {
            return;
        }
        fetch(`/admin/transactions/chart-data?${params}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("🚀 ~ .then ~ data:", data)
                setChartData(data);
            })
            .catch((error) => console.error("Error fetching chart data:", error));
    };

    useEffect(() => {
        fetchChartData();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <>
                <div className="flex gap-2">
                    <input
                        name='start_date'
                        type="date"
                        className="input input-bordered"
                        onChange={handleChange}
                    />
                    <input
                        name='end_date'
                        type="date"
                        className="input input-bordered"
                        onChange={handleChange}
                    />
                </div>

                <div className="charts">
                    {chartData ? (
                        <>
                            <h2>Income vs. Expense</h2>
                            <PieChart
                                data={{
                                    labels: Object.keys(chartData.income_expense || {}),
                                    datasets: [
                                        {
                                            label: "Income vs Expense",
                                            data: Object.values(chartData.income_expense || {}),
                                            backgroundColor: ["#4caf50", "#f44336"],
                                        },
                                    ],
                                }}
                            />

                            <h2>Expense by Category</h2>
                            <BarChart
                                data={{
                                    labels: Object.keys(chartData.category || {}),
                                    datasets: [
                                        {
                                            label: "Expense by Category",
                                            data: Object.values(chartData.category || {}),
                                            backgroundColor: "#2196f3",
                                        },
                                    ],
                                }}
                            />
                        </>
                    ) : (
                        <p className='text-red-600 mt-4'>Please Use Above Date Filters to populate chart</p>
                    )}
                </div>
            </>

        </AuthenticatedLayout>
    );
}
