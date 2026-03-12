import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const Dashboard = () => {

  const [stats, setStats] = useState({
    students: 0,
    lessons: 0,
    sessions: 0
  });

  const fetchStats = async () => {

    const res = await api.get("/dashboard/stats");

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Students</h3>
          <p className="text-3xl font-bold mt-2">{stats.students}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Lessons</h3>
          <p className="text-3xl font-bold mt-2">{stats.lessons}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Sessions</h3>
          <p className="text-3xl font-bold mt-2">{stats.sessions}</p>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;