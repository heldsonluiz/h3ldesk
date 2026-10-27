import { getPrivateWorkspace } from "@/server/workspace";
export async function GET(request: Request) {
  const access = await getPrivateWorkspace(request.headers);
  if (!access)
    return Response.json(
      { error: "Entre com uma conta verificada." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  const { id, name, timezone, currency } = access.workspace;
  return Response.json(
    { id, name, timezone, currency },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
