import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Pages/Components/Pagination';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ transactions }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, transaction) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/transactions/${transaction.id}/delete`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Transaction" />
            <Link as="button" href={route('admin.transactions.create')} className="bg-blue-500 hover:bg-blue-700 text-white btn">Create</Link>

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
                <Pagination links={transactions.links} />
            </div>
        </AuthenticatedLayout>
    )
}