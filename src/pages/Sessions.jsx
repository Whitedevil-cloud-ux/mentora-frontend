import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const Sessions = () => {

  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [sessions, setSessions] = useState([]);

  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");

  // Fetch lessons
  const fetchLessons = async () => {

    const res = await api.get("/lessons");

    setLessons(res.data);

    if (res.data.length > 0) {
      setSelectedLesson(res.data[0]._id);
    }
  };

  // Fetch sessions
  const fetchSessions = async (lessonId) => {

    const res = await api.get(`/sessions/lessons/${lessonId}/sessions`);

    setSessions(res.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    if (selectedLesson) {
      fetchSessions(selectedLesson);
    }
  }, [selectedLesson]);

  const handleCreateSession = async (e) => {

    e.preventDefault();

    await api.post("/sessions", {
      lessonId: selectedLesson,
      topic,
      summary
    });

    setTopic("");
    setSummary("");

    fetchSessions(selectedLesson);
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Sessions
      </h1>

      {/* Lesson Selector */}

      <div className="bg-white p-6 shadow rounded-xl mb-6">

        <label className="block mb-2 font-semibold">
          Select Lesson
        </label>

        <select
          value={selectedLesson}
          onChange={(e) => setSelectedLesson(e.target.value)}
          className="border p-3 rounded-lg w-64"
        >

          {lessons.map((lesson) => (

            <option key={lesson._id} value={lesson._id}>
              {lesson.title}
            </option>

          ))}

        </select>

      </div>

      {/* Create Session */}

      <div className="bg-white p-6 shadow rounded-xl mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Create Session
        </h2>

        <form
          onSubmit={handleCreateSession}
          className="flex gap-4 flex-wrap"
        >

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Session Topic"
            className="border p-3 rounded-lg w-64"
          />

          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary"
            className="border p-3 rounded-lg w-64"
          />

          <button
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Create Session
          </button>

        </form>

      </div>

      {/* Sessions List */}

      <div className="grid md:grid-cols-3 gap-6">

        {sessions.map((session) => (

          <div
            key={session._id}
            className="bg-white shadow rounded-xl p-6"
          >

            <h3 className="text-xl font-semibold">
              {session.topic}
            </h3>

            <p className="text-gray-600 mt-2">
              {session.summary}
            </p>

            <p className="text-gray-400 mt-3 text-sm">
              {new Date(session.date).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
};

export default Sessions;