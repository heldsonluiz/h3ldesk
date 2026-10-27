import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { db } from "./db";
export async function getPrivateWorkspace(
  requestHeaders: Headers,
  workspaceId?: string,
) {
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session?.user.emailVerified) return null;
  const workspace = await db.workspace.findFirst({
    where: {
      ownerId: session.user.id,
      ...(workspaceId ? { id: workspaceId } : {}),
    },
  });
  return workspace ? { workspace, user: session.user } : null;
}
export async function requireWorkspace() {
  const access = await getPrivateWorkspace(await headers());
  if (!access) redirect("/entrar");
  return access;
}
