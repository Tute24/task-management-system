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
      <ul className="flex flex-col items-center text-center gap-10">
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
