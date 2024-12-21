import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
    })

    function submit(e, category) {
        e.preventDefault()
        patch(`/admin/categories/${category.id}/update`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Update Category" />
            <form onSubmit={(event) => submit(event, category)}>
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

                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>Update</button>
            </form>
        </AuthenticatedLayout>
    )
}