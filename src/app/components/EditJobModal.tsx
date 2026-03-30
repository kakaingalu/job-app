"use client";

import { useState } from "react";

export default function EditJobModal({ job, onClose, onSave }: any) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [budget, setBudget] = useState<number>(0);
  const [location, setLocation] = useState(job.location);
  const [currency, setCurrency] = useState("KES");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>

        <input
          className="w-full border p-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          step="0.01" // allows decimals like 10.50
          min="0"
          className="w-full border p-2 mb-3"
          value={budget}
          onChange={(e) => {
            const value = e.target.value;
            setBudget(value ? parseFloat(value) : 0);
          }}
        />
        
        <input
          className="w-full border p-2 mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() =>
              onSave({
                ...job,
                title,
                description,
                budget,
                location,
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}