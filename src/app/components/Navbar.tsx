import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">JobApp</h1>

      <div className="flex gap-4">
        <Link href="/jobs">Jobs</Link>
        <Link href="/post">Post</Link>
      </div>
    </div>
  );
}