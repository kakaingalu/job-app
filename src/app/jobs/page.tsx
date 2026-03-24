"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} className="border p-4 mb-3">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.description}</p>
          <p>💰 {job.budget}</p>
          <p>📍 {job.location}</p>
        </div>
      ))}
    </div>
  );
}