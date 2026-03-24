import { NextResponse } from "next/server";
import { addJob, getJobs } from "@/lib/jobs";
import { Job } from "@/types/job";

export async function GET() {
  return NextResponse.json(getJobs());
}

export async function POST(req: Request) {
  const data = await req.json();

  const newJob: Job = {
    id: Date.now().toString(),
    title: data.title,
    description: data.description,
    budget: Number(data.budget),
    location: data.location,
    createdAt: new Date().toISOString(),
  };

  addJob(newJob);

  return NextResponse.json({ message: "Job created" });
}