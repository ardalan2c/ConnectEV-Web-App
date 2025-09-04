export async function GET() {
  return Response.json({ ok: true, mode: process.env.NODE_ENV });
}