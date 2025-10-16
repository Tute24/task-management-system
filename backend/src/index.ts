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
// By using this function, I can avoid code repetititon, and also, if there's any server error caused by bug, or, maybe, connection issues, the application can throw this error (500)
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
        console.log(newTask)
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
      }),
    )
    .mutation(({ input }) => {
      try {
        const referredTask = tasksArray.find((task) => task.id === input.id)
        //If, by any means, there is a request with an non existent id number, the application must be able to return an error that correlates with the situation (404). TRPCError is pretty good for that situation
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
  router: appRouter,
})

// I was having problem with CORS (because the front and backend are running on different ports, so I had to google a way to enable the requests)
server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // the * allows any address to make requests to the backend, which is usually not safe, but for this case's resolution purposes, it's ok
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    //preflight req, that avoids the chance of CORS error
    res.writeHead(204)
    res.end()
    return
  }
})

// If this project went to production, it would be possible to config an specific port on the .env file for the server to listen to.
const port = process.env.PORT || 3000

server.listen(port)
console.log(`Server started running on port ${port}!`)
export type AppRouter = typeof appRouter
