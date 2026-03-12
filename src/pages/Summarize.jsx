import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const Summarize = () => {

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {

    if (!text.trim()) return;

    setLoading(true);

    try {

      const res = await api.post("/llm/summarize", {
        text
      });

      setSummary(res.data.summary);

    } catch (error) {

      console.error(error);
      alert("LLM service failed");

    }

    setLoading(false);
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        AI Summarizer
      </h1>

      <div className="bg-white shadow rounded-xl p-6">

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste lesson notes or text to summarize..."
          className="w-full border p-4 rounded-lg h-40"
        />

        <button
          onClick={handleSummarize}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

      </div>

      {summary && (

        <div className="bg-white shadow rounded-xl p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Summary
          </h2>

          <p className="text-gray-700 whitespace-pre-line">
            {summary}
          </p>

        </div>

      )}

    </DashboardLayout>
  );
};

export default Summarize;