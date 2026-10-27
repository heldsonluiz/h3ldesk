import { getPrivateWorkspace } from "@/server/workspace";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  const { workspaceId } = await params;
  const access = await getPrivateWorkspace(request.headers, workspaceId);
  if (!access)
    return Response.json(
      { error: "Workspace não encontrado ou sem acesso." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  return Response.json(
    {
      id: access.workspace.id,
      name: access.workspace.name,
      timezone: access.workspace.timezone,
      currency: access.workspace.currency,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
