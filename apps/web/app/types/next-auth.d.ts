// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      /** The user's postal address. */
      id:string
      name: string
      email: string
      image:string
    },
    expires:Date
  }
}