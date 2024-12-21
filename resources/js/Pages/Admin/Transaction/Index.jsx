import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Pages/Components/Pagination';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ allTransactions }) {

    const [filters, setFilters] = useState({
        type: '',
        start_date: '',
        end_date: '',
    });

    const [transactions, setTransactions] = useState(allTransactions);


    const buildQueryString = (filters) => {
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type);
        if (filters.start_date && filters.end_date) {
            params.append('start_date', filters.start_date);
            params.append('end_date', filters.end_date);
        }
        return params.toString();
    };

    const fetchTransactions = (updatedFilters) => {
        const queryString = buildQueryString(updatedFilters);

        fetch(`/admin/transactions/filter?${queryString}`)
            .then(res =>
                res.json()
            ).then((data) => {
                setTransactions(data);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        fetchTransactions(updatedFilters);
    };

    const { delete: destroy, processing } = useForm()

    function submit(e, transaction) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/transactions/${transaction.id}/delete`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Transaction" />
            <div className='flex gap-2'>
                <Link as="button" href={route('admin.transactions.create')} className="bg-blue-500 hover:bg-blue-700 text-white btn">Create</Link>
                <select
                    name="type"
                    className="select select-bordered"
                    onChange={handleChange}
                >
                    <option value="">By Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

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

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data && transactions.data.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.category.name}</td>
                                <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>{transaction.type}</td>
                                <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>{transaction.amount}</td>
                                <td>{transaction.transaction_date}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.transactions.edit', transaction.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, transaction)}>
                                        <button className="btn btn-error btn-xs" disabled={processing}>Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    transactions.data && <Pagination links={transactions.links} />
                }
            </div>
        </AuthenticatedLayout>
    )
}