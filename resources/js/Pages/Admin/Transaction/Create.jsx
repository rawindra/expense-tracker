import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        type: '',
        amount: '',
        transaction_date: '',
        image: {}
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/transactions/store')
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Create Transaction" />
            <form onSubmit={submit}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Category</span>
                    </div>
                    <select
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option disabled value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option value={category.id} key={index}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <span className='text-red-500'>{errors.category_id}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Type</span>
                    </div>
                    <select
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option disabled value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    {errors.type && <span className='text-red-500'>{errors.type}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Amount</span>
                    </div>
                    <input
                        type="number"
                        min={1}
                        value={data.amount}
                        onChange={e => setData('amount', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.amount && <span className='text-red-500'>{errors.amount}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Date</span>
                    </div>
                    <input
                        type='date'
                        value={data.transaction_date}
                        onChange={e => setData('transaction_date', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.transaction_date && <span className='text-red-500'>{errors.transaction_date}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pick a Image</span>
                    </div>
                    <input
                        type="file"
                        onChange={e => { setData('image', e.target.files[0]) }}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {errors.image && <span className='text-red-500'>{errors.image}</span>}
                </label>

                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>Create</button>
            </form>
        </AuthenticatedLayout>
    )
}