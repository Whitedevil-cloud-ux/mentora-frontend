import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const Lessons = () => {

  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");

  const fetchLessons = async () => {
    try {
        const res = await api.get("/lessons");
        console.log("Lessons API response:", res.data);
        setLessons(res.data);
    } catch (error) {
        console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleCreateLesson = async (e) => {

    e.preventDefault();

    await api.post("/lessons", { title });

    setTitle("");

    fetchLessons();
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Lessons
      </h1>

      {/* Create Lesson */}

      <div className="bg-white shadow rounded-xl p-6 mb-6">

        <form
          onSubmit={handleCreateLesson}
          className="flex gap-4"
        >

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lesson Title"
            className="border p-3 rounded-lg w-64"
          />

          <button
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Create Lesson
          </button>

        </form>

      </div>

      {/* Lessons List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {lessons.length === 0 && (
            <p className="text-gray-500">No lessons yet</p>
        )}

        {lessons.map((lesson) => (
            <div
            key={lesson._id}
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
            >
            <h3 className="text-xl font-semibold">
                {lesson.title}
            </h3>
            {lesson.description && (
                <p className="text-gray-600 mt-2">
                {lesson.description}
                </p>
            )}
            <p className="text-gray-400 mt-3 text-sm">
                Created: {new Date(lesson.createdAt).toLocaleDateString()}
            </p>
            </div>
        ))}
        </div>
    </DashboardLayout>
  );
};

export default Lessons;