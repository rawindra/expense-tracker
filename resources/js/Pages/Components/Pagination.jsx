import { Link } from '@inertiajs/react'

const Pagination = ({ links }) => {
    return (
        <div className='flex justify-end'>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    aria-current="page"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`${link.active ? 'active' : ''} relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"`}
                >
                </Link>
            )
            )}
        </div >
    )
}

export default Pagination
