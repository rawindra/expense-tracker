import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/categories/store')
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Create Category" />
            <form onSubmit={submit}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <span className='text-red-500'>{errors.name}</span>}
                </label>

                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>Create</button>
            </form>
        </AuthenticatedLayout>
    )
}