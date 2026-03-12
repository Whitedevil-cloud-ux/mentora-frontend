import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, Calendar, Sparkles } from "lucide-react";

const Sidebar = () => {

  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition 
    ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Mentora
      </h1>

      <nav className="space-y-3">

        <Link to="/" className={linkClass("/")}>
          <Home size={20} />
          Dashboard
        </Link>

        <Link to="/students" className={linkClass("/students")}>
          <Users size={20} />
          Students
        </Link>

        <Link to="/lessons" className={linkClass("/lessons")}>
          <BookOpen size={20} />
          Lessons
        </Link>

        <Link to="/sessions" className={linkClass("/sessions")}>
          <Calendar size={20} />
          Sessions
        </Link>

        <Link to="/summarize" className={linkClass("/summarize")}>
            <Sparkles size={20} />
            AI Summarizer
        </Link>
      </nav>

    </div>
  );
};

export default Sidebar;