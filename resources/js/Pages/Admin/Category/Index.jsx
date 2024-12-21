import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Pages/Components/Pagination';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ categories }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, category) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/categories/${category.id}/delete`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Category" />
            <Link as="button" href={route('admin.categories.create')} className="bg-blue-500 hover:bg-blue-700 text-white btn">Create</Link>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data && categories.data.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.categories.edit', category.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, category)}>
                                        <button className="btn btn-error btn-xs" disabled={processing}>Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={categories.links} />
            </div>
        </AuthenticatedLayout>
    )
}