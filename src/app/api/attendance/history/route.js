import { forwardToServer } from "@/lib/serverProxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return forwardToServer(request, "/api/attendance/history");
}
