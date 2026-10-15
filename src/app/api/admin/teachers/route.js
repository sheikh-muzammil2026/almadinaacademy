import { forwardToServer } from "@/lib/serverProxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return forwardToServer(request, "/api/admin/teachers");
}

export async function PATCH(request) {
  return forwardToServer(request, "/api/admin/teachers");
}
