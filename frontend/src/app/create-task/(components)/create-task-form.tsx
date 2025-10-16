'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/common/spinner'
import { trpc } from '@/trpcClient'

// Implementing a schema to validate the forms' inputs with Zod
export const taskSchema = z.object({
  taskTitle: z.string().min(2, {
    message: 'Enter a valid title for your task! This field cannot be empty.',
  }),
  taskDescription: z.string(),
})
export type taskData = z.infer<typeof taskSchema>

export default function CreateTaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<taskData>({
    resolver: zodResolver(taskSchema),
  })

  //   //   This function works as the submit handler from zod. It sends the data to the backend after validating the inputs
  //   and resets the input fields on the form
  const onSubmit: SubmitHandler<taskData> = async (data) => {
    try {
      const createdTask = await trpc.createTask.mutate(data)
      if (createdTask) {
        reset()
        alert('Task successfully created!') // if the task creation is succesfull, the user receives an alert on the screen with the success message (good for user experience)
      }
    } catch (error: any) {
      alert(error.message || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col items-center m-auto">
      <div className="px-2">
        <Card className="sm:min-w-[400px]">
          <CardHeader>
            <CardTitle className="text-center font-bold text-lg">
              Create a new task!
            </CardTitle>
            <CardDescription>
              Create a new task with it's title and description, and it will
              appear on your list!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form to create a new task, using react-hook form tools like register and errors' warnings */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start justify-start gap-5">
                <div className="flex flex-col gap-3 w-full">
                  <Label className="text-md">Task Title*</Label>
                  <Input
                    type="text"
                    {...register('taskTitle')}
                    placeholder="Create a title for your task"
                    required
                  />
                  {errors.taskTitle && (
                    <span className="text-red-600 text-sm">
                      {errors.taskTitle.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Label className="text-md">Task Description</Label>
                  <Input
                    type="text"
                    {...register('taskDescription')}
                    placeholder="Create a description for your task (optional)"
                  />
                </div>
                <span className="text-sm">
                  Required fields are marked with an asterisk (*)
                </span>
                <div className="pb-5 w-full">
                  {/* When the submit button is clicked it submits the creation of a new task, and while the data is being submitted, the 'isSubmitting' form state takes care of the button to avoid sending duplicate requests. */}
                  <Button
                    type="submit"
                    className="w-full font-bold text-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner /> : 'Create Task'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
