import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const Students = () => {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  const fetchStudents = async () => {

    const res = await api.get("/students");

    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {

    e.preventDefault();

    await api.post("/students", { name });

    setName("");

    fetchStudents();
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Students
      </h1>

      {/* Add Student */}
      <form
        onSubmit={handleAddStudent}
        className="flex gap-3 mb-6"
      >

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="border p-3 rounded-lg w-64"
        />

        <button
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Add Student
        </button>

      </form>

      {/* Students Table */}

      <div className="bg-white shadow rounded-xl">

        <table className="w-full">

          <thead className="border-b">

            <tr className="text-left">

              <th className="p-4">Student Name</th>
              <th className="p-4">Created</th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default Students;