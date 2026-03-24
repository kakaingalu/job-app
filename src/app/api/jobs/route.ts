import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// CREATE job
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const job = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        budget: Number(body.budget) || 0,
        location: body.location || "",
      },
    });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}