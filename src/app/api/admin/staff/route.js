import { forwardToServer } from "@/lib/serverProxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return forwardToServer(request, "/api/admin/staff");
}

export async function POST(request) {
  return forwardToServer(request, "/api/admin/staff");
}

export async function PATCH(request) {
  return forwardToServer(request, "/api/admin/staff");
}

export async function DELETE(request) {
  return forwardToServer(request, "/api/admin/staff");
}
