import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">
        <Link href="/">JobsApp</Link>
      </h1>

      <div className="flex gap-4">
        <Link href="/jobs">View Jobs</Link>
        <Link href="/post">Post Job</Link>
      </div>
    </div>
  );
}