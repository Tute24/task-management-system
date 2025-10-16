import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../backend/src/index'

// The following piece of code is the setup of the tRPC Client, and importing AppRouter guarantees the typesafety provided by tRPC
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${process.env.PORT}`, //I used 3000 on the PORT env variable. I put this way to ensure more control and sfety for the developer
    }),
  ],
})
