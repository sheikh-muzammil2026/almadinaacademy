import { forwardToServer } from "@/lib/serverProxy";

export const dynamic = "force-dynamic";

export async function POST(request) {
  return forwardToServer(request, "/api/chat");
}
