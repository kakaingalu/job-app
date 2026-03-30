"use client";

export default function PostPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;

    await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
        budget: form.budget.value,
        location: form.location.value,
      }),
    });

    window.location.href = "/jobs";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-black font-bold">Post a Job</h1>

        <input
          name="title"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget"
          className="w-full p-2 border rounded"
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}