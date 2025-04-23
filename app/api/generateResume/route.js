import { GeneratedResumes } from "@/configs/schema";


export const runtime = 'edge';

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await GeneratedResumes(body);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}