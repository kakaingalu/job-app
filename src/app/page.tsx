export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Job Match App</h1>

      <div className="mt-6 space-x-4">
        <a href="/post" className="bg-blue-500 text-white px-4 py-2 rounded">
          Post Job
        </a>

        <a href="/jobs" className="bg-green-500 text-white px-4 py-2 rounded">
          View Jobs
        </a>
      </div>
    </main>
  );
}