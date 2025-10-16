'use client'

import { useState } from 'react'
import TaskCard from './task-card'
import { trpc } from '@/trpcClient'

export type taskType = {
  id: number
  taskTitle: string
  taskDescription: string
  createDate: number
}

export type updateType = {
  id: number
  taskTitle: string
  taskDescription: string
}

type TasksDisplayProps = {
  tasksListData: taskType[]
}

export default function TaksDisplay({ tasksListData }: TasksDisplayProps) {
  const [tasks, setTasks] = useState<taskType[] | []>(tasksListData)
  //Here, in those two functions, I handled the deletion and update of the tasks, passing them as props to the task card so I don't need to use context API or another state management alternative to share the tasks state with other component
  const handleTaskRemoval = async (id: number) => {
    try {
      const deletedTask = await trpc.deleteTask.mutate(id)
      if (deletedTask) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        alert('Task sucessfully deleted!')
      }
    } catch (error: any) {
      alert(error.message || 'Something went wrong')
    }
  }

  const handleTaskUpdate = async (updatedTask: updateType) => {
    try {
      const taskUpdated = await trpc.updateTask.mutate(updatedTask)
      if (taskUpdated) {
        setTasks((prev) =>
          prev.map((task) => (task.id === updatedTask.id ? taskUpdated : task)),
        )
        alert('Task updated successfully!')
      }
    } catch (error: any) {
      alert(error.message || 'Something went wrong')
    }
  }

  return (
    <>
      <ul className="flex flex-col items-center text-center gap-10 pb-5">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              {...task}
              onDelete={handleTaskRemoval}
              onUpdate={handleTaskUpdate}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
