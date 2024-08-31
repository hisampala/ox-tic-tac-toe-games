
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID_GOOGLE,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        }),
        GithubProvider({
            clientId: process.env.CLIENT_ID_GITHUB,
            clientSecret: process.env.CLIENT_SECRET_GITHUB,
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user?.id) {
                token.id = user.id
            }
            if (user?.name) {
                token.name = user.name;
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    secret:process.env.SECRET_KEY,
    session: {
        strategy: "jwt",
    },

}
export default options