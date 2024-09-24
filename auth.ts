import NextAuth, {DefaultSession} from "next-auth"

import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            /** The user's role. */
            role: UserRole;
        } & DefaultSession["user"]
    }
}

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                }
            })
        }
    },
    callbacks: {
        // async signIn({user}) {
        //     if (!user.id) return false;
        //
        //     // Check if the user is verified
        //     const currentUser = await getUserById(user.id);
        //
        //     return !(!currentUser || !currentUser.emailVerified);
        //
        // },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role
                    }
                }
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            // Fetch user from database
            const currentUser = await getUserById(token.sub);

            if (!currentUser) return token;

            // Inject role to token
            token.role = currentUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})
