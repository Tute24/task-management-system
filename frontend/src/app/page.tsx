import { trpc } from '@/trpcClient'
import TaksDisplay from './(components)/tasks-display'

export default async function Home() {
  const tasksArray = await trpc.getTasks.query() //tRPC enables full typesafe, so tasksArray comes as taskType[]. Also, this is SSR being used to pre-load the tasks list (no 'use client' on this component)
  return (
    <>
      <div className="flex flex-col text-xl font-bold items-center m-auto justify-center text-center gap-5 py-5">
        <h1>Here is Your Tasks List!</h1>
        <h2 className="text-lg text-blue-800">
          Your tasks list
          <br />
          You can update or delete your tasks
        </h2>
      </div>
      <div className="flex max-w-[750px] min-w-[400px] items-center justify-center text-center m-auto">
        {tasksArray && <TaksDisplay tasksListData={tasksArray} />}
      </div>
    </>
  )
}
