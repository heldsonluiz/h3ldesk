import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { db } from "./db";
import { getEnvironment } from "./environment";
import { sendAccountEmail } from "./mail";
const env = getEnvironment();
export const auth = betterAuth({
  appName: "H3LDesk",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
  database: prismaAdapter(db, { provider: "postgresql", transaction: true }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    resetPasswordTokenExpiresIn: 1800,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendAccountEmail(user.email, url, "reset");
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: false,
    expiresIn: 3600,
    sendVerificationEmail: async ({ user, url }) => {
      await sendAccountEmail(user.email, url, "verify");
    },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 60,
    customRules: {
      "/sign-up/email": { window: 60, max: 5 },
      "/sign-in/email": { window: 60, max: 10 },
      "/request-password-reset": { window: 60, max: 3 },
      "/send-verification-email": { window: 60, max: 3 },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.workspace.upsert({
            where: { ownerId: user.id },
            update: {},
            create: { ownerId: user.id, name: `Workspace de ${user.name}` },
          });
        },
      },
    },
  },
  advanced: {
    cookiePrefix: `h3ldesk-${env.APP_ENV}`,
    useSecureCookies: ["production", "homologation"].includes(env.APP_ENV),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: false },
  },
});
