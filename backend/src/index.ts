import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from './trpc'
import z from 'zod'

type taskType = {
  id: number
  taskTitle: string
  taskDescription: string
  createDate: number
}

function InternalServerErrorThrow() {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong. Try Again.',
  })
}

const tasksArray: taskType[] = []

const appRouter = router({
  // Query that is like a get all query and returns all the created tasks storaged on memory

  getTasks: publicProcedure.query(() => {
    try {
      return tasksArray
    } catch (error) {
      InternalServerErrorThrow()
    }
  }),

  createTask: publicProcedure
    .input(
      z.object({ taskTitle: z.string().min(2), taskDescription: z.string() }), // Zod validation to guarantee that the taskTitle, when creating a new task, isn't empty and is a string with, at least, 2 characters
    )
    .mutation(({ input }) => {
      try {
        const newTask = {
          // Using Date.now() as an unique id because this app only allows to create one task per request
          id: Date.now(),
          taskTitle: input.taskTitle,
          taskDescription: input.taskDescription,
          createDate: Date.now(),
        }
        tasksArray.push(newTask)
        return tasksArray
      } catch (error) {
        InternalServerErrorThrow()
      }
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
        taskTitle: z.string().min(2),
        taskDescription: z.string(),
        createDate: z.number(),
      }),
    )
    .mutation(({ input }) => {
      try {
        const referredTask = tasksArray.find((task) => task.id === input.id)
        if (!referredTask)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `This task was not found in the database. It probably doesn't exist.`,
          })
        referredTask.taskTitle = input.taskTitle
        referredTask.taskDescription = input.taskDescription
        return referredTask
      } catch (error) {
        InternalServerErrorThrow()
      }
    }),

  deleteTask: publicProcedure.input(z.number()).mutation(({ input }) => {
    try {
      const referredTask = tasksArray.find((task) => task.id === input)
      if (!referredTask)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `This task was not found in the database. It probably doesn't exist.`,
        })
      const deletedTask = tasksArray.splice(tasksArray.indexOf(referredTask), 1)
      return deletedTask
    } catch (error) {
      InternalServerErrorThrow()
    }
  }),
})

const server = createHTTPServer({
    router: appRouter
})

// If this project went to production, it would be possible to config an specific port on the .env file for the server to listen to.
const port = process.env.PORT || 3000

server.listen(port)
console.log(`Server started running on port ${port}!`)
export type AppRouter = typeof appRouter
