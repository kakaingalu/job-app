"use client";

import { useState } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        budget,
        location,
      }),
    });

    alert("Job posted!");

    setTitle("");
    setDescription("");
    setBudget("");
    setLocation("");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Post a Job</h2>

      <input
        placeholder="Title"
        className="border p-2 block mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 block mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Budget"
        className="border p-2 block mb-2"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        placeholder="Location"
        className="border p-2 block mb-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Submit
      </button>
    </div>
  );
}