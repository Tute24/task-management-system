import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../backend/src/index'

// The following piece of code is the setup of the tRPC Client, and importing AppRouter guarantees the typesafety provided by tRPC
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:3000`, 
    }),
  ],
})
