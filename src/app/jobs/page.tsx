"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        // ✅ ensure it's always an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Invalid data:", data);
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10">Loading jobs...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Jobs</h2>

      {jobs.length === 0 && (
        <p className="text-gray-500">No jobs available</p>
      )}

      {jobs.map((job) => (
        <div key={job.id} className="border p-4 mb-3 rounded">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.description}</p>
          <p>💰 {job.budget}</p>
          <p>📍 {job.location}</p>

          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                const newTitle = prompt("New title", job.title);
                if (!newTitle) return;

                await fetch(`/api/jobs/${job.id}`, {
                  method: "PUT",
                  body: JSON.stringify({
                    ...job,
                    title: newTitle,
                  }),
                });

                window.location.reload();
              }}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                if (!confirm("Delete this job?")) return;

                await fetch(`/api/jobs/${job.id}`, {
                  method: "DELETE",
                });

                window.location.reload();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}