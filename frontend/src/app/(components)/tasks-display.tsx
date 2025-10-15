'use client'

import { useState } from 'react'
import TaskCard from './task-card'

export type taskType = {
  id: number
  taskTitle: string
  taskDescription: string
  createDate: number
}

type TasksDisplayProps = {
  tasksListData: taskType[]
}

export default function TaksDisplay({ tasksListData }: TasksDisplayProps) {
  const [tasks, setTasks] = useState<taskType[] | []>(tasksListData)

  const handleTaskRemoval = (id:number) => {
    setTasks((prev)=> prev.filter((task)=>task.id !== id))
  }

  const handleTaskUpdate = (updatedTask: taskType) => {
    setTasks((prev) => prev.map((task) => task.id === updatedTask.id ? updatedTask : task))
  }

  return (
    <>
      <ul className="flex flex-col items-center text-center gap-10">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard {...task} onDelete={handleTaskRemoval} onUpdate={handleTaskUpdate} />
          </li>
        ))}
      </ul>
    </>
  )
}
