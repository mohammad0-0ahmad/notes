import User from "db/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//TODO: Change it to 10
const SESSION_EXPIRY_DAYS = 0.25;

export default NextAuth({
  theme: { colorScheme: "light" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      //@ts-ignore
      authorize: User.authorize,
      //@ts-ignore
    credentials: undefined,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      //@ts-ignore
      session = { ...session, user: token.user };
      delete token.id;

      return session;
    },
  },
  pages: { signIn: "/" },
  useSecureCookies: process.env.NODE_ENV === "production",
  session: {
    maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60,
  },
});
