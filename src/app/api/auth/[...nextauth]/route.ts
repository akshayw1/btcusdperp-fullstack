import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { compare } from "bcrypt";
type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  admin?: any;
  isVerifiedUser?: any;
};
const handler = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, account, profile }) {
      await connectMongoDB();

      const findUser = await User.findOne({
        email: token.email,
      }).select("admin isVerifiedUser");

      token = {
        ...token,
        admin: findUser.admin,
        isVerifiedUser: findUser.isVerifiedUser,
      } as User;

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      await connectMongoDB();

      const findUser = await User.findOne({
        email: session.user?.email,
      }).select("admin isVerifiedUser");

      session.user = {
        ...session.user,
        admin: findUser.admin,
        isVerifiedUser: findUser.isVerifiedUser,
      } as User;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
        email: {
          label: "Email",
          type: "text",
        },
        admin: {
          label: "Role",
          type: "boolean",
        },
      },

      async authorize(credentials) {
        await connectMongoDB();

        const user =
          credentials?.email !== " "
            ? await User.findOne({
                email: credentials?.email.toUpperCase(),
              })
            : null;
        if (!user) {
          console.log("Invalid Email");
          throw new Error("Wrong credentials");
        }

        if (
          user.password !== " " &&
          (await compare(credentials!.password, user.password))
        ) {
          if (user.isVerifiedUser) {
            console.log("user logged");
            return user;
          } else {
            throw new Error("Unverified User");
          }
        } else {
          console.log("Invalid Password");
          throw new Error("Wrong credentials");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
