import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div className="flex flex-row sm:px-50 px-12 min-h-[85px] text-center items-center w-full">
        <nav className="flex justify-between sm:text-lg text-sm  w-full sm:gap-5">
          <div>
            <Link className='font-bold hover:underline' href="/">See Your Tasks List</Link>
          </div>
          <div>
            <Link className='font-bold hover:underline' href="/create-task">Create a new task!</Link>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-gray-500" />
    </>
  )
}
