import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// DELETE job
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// UPDATE job
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX

    const body = await req.json();

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        budget: Number(body.budget),
        location: body.location,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}