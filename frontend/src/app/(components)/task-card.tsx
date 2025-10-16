import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { taskType, updateType } from './tasks-display'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { taskSchema } from '../create-task/(components)/create-task-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/common/spinner'

type TaskCardProps = taskType & {
  onDelete: (id: number) => void
  onUpdate: (updatedTask: updateType) => void
}

export default function TaskCard({
  onDelete,
  onUpdate,
  id,
  createDate,
  taskDescription,
  taskTitle,
}: TaskCardProps) {
  const [selectedTask, setSelectedTask] = useState(0)
  const [updateProps, setUpdateProps] = useState({
    id: 0,
    taskTitle: '',
    taskDescription: '',
  })
  type updateTask = z.infer<typeof taskSchema>
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateTask>({
    resolver: zodResolver(taskSchema),
  })

  useEffect(() => {
    if (id === selectedTask) {
      reset({
        taskTitle: updateProps.taskTitle,
        taskDescription: updateProps.taskDescription,
      })
    }
  }, [selectedTask, id, updateProps, reset])

  const onSubmit: SubmitHandler<updateTask> = (data) => {
    onUpdate({
      id: selectedTask,
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
    })
    console.log(data)
    setUpdateProps({
      id: 0,
      taskTitle: '',
      taskDescription: '',
    })
    setSelectedTask(0)
  }
  return (
    <>
      {id !== selectedTask && (
        <Card className="w-full sm:min-w-[400px] hover:shadow-md hover:shadow-gray-500">
          <CardHeader className="flex flex-row justify-between text-center px-2 py-2">
            <Button
              type="button"
              onClick={() => {
                setUpdateProps({
                  id: id,
                  taskTitle: taskTitle,
                  taskDescription: taskDescription,
                })
                setSelectedTask(id)
              }}
            >
              Update Task
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(id)}
            >
              Delete Task
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 font-semibold min-w-[350px]">
            <div className="items-center text-lg font-bold">{taskTitle}</div>
            <div className="items-center text-md">
              <span className="text-blue-600">What to do:</span>{' '}
              {taskDescription}
            </div>
            <div className="items-center text-md">
              <span className="text-blue-600">Created at:</span>{' '}
              {`${createDate}`}
            </div>
          </CardContent>
        </Card>
      )}
      {id === selectedTask && (
        <Card className="w-full sm:min-w-[400px] hover:shadow-md hover:shadow-gray-500">
          <CardHeader className="flex flex-row justify-between text-center px-2 py-2">
            <Button
              disabled={isSubmitting}
              type="button"
              onClick={() => {
                setSelectedTask(0)
                setUpdateProps({
                  id: 0,
                  taskTitle: '',
                  taskDescription: '',
                })
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              type="button"
              variant="destructive"
              onClick={() => {
                onDelete(id)
                setSelectedTask(0)
                setUpdateProps({
                  id: 0,
                  taskTitle: '',
                  taskDescription: '',
                })
              }}
            >
              Delete Task
            </Button>
          </CardHeader>
          <CardContent className="w-full gap-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 mb-3 items-start">
                <Label className="text-md"> Update the task's title</Label>
                <Input required type="text" {...register('taskTitle')} />
                {errors.taskTitle && (
                  <span className="text-red-600 text-sm">
                    {errors.taskTitle.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 mb-3 items-start">
                <Label className="text-md">
                  {' '}
                  Update or add the task's description
                </Label>
                <Input type="text" {...register('taskDescription')} />
              </div>
              <div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full text-md text-center"
                  variant="secondary"
                >
                  {isSubmitting ? <Spinner /> : 'Confirm Update'}
                </Button>
              </div>
              <div className="items-center text-md py-2 font-bold">
                <span className="text-blue-600">Created at:</span>{' '}
                {`${createDate}`}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
