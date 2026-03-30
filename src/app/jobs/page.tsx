"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditJobModal from "@/app/components/EditJobModal";



export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<any>(null);

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
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              onClick={() => setEditingJob(job)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
              onClick={async () => {
                const confirmDelete = confirm("Are you sure?");
                if (!confirmDelete) return;

                await fetch(`/api/jobs/${job.id}`, {
                  method: "DELETE",
                });

                setJobs((prev) => prev.filter((j) => j.id !== job.id));

                toast.success("Job deleted 🗑️");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={async (updatedJob: any) => {
            const res = await fetch(`/api/jobs/${updatedJob.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedJob),
            });

            const data = await res.json();

            setJobs((prev) =>
              prev.map((j) => (j.id === data.id ? data : j))
            );

            toast.success("Job updated ✅");
            setEditingJob(null);
          }}
        />
      )}
    </div>



  );
}