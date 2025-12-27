import { getServiceById, getServices } from "@/actions/server/service";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = id ? await getServiceById(id) : await getServices();
  return Response.json(data);
}
