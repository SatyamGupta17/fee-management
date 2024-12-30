'use client';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../components/Layouts/DefaultLayout';

function TeacherSalary() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  useEffect(() => {
    // Fetch teacher data from API
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error('Failed to fetch teacher data', err));
  }, []);

  const handleSave = async () => {
    const method = currentTeacher.id ? 'PUT' : 'POST';
    const url = currentTeacher.id ? `/api/teachers/${currentTeacher.id}` : '/api/teachers';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentTeacher),
    });

    if (response.ok) {
      const updatedTeacher = await response.json();
      setTeachers((prev) =>
        currentTeacher.id
          ? prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
          : [...prev, updatedTeacher]
      );
      setShowModal(false);
    } else {
      console.error('Failed to save teacher');
    }
  };

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentTeacher({
      id: null,
      uniqueId: '',
      name: '',
      role: '',
      salary: '',
      dateOfJoining: new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  return (
    <DefaultLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Teacher Salary Management</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Add New Teacher
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Unique ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Salary (₹)</th>
                <th className="border p-2">Date of Joining</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="border p-2">{teacher.uniqueId}</td>
                  <td className="border p-2">{teacher.name}</td>
                  <td className="border p-2">{teacher.role}</td>
                  <td className="border p-2">₹{teacher.salary}</td>
                  <td className="border p-2">{teacher.dateOfJoining}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="text-blue-600 hover:underline"
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 p-4">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {currentTeacher.id ? 'Modify Teacher' : 'Add New Teacher'}
            </h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                value={currentTeacher.name}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, name: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Role</label>
              <select
                value={currentTeacher.role}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, role: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="">Select Role</option>
                <option value="Principal">Principal (P)</option>
                <option value="Vice Principal">Vice Principal (VP)</option>
                <option value="Clerk">Clerk (C)</option>
                <option value="Teacher">Teacher (T)</option>
                <option value="Lab Assistant">Lab Assistant (LS)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Salary</label>
              <input
                type="number"
                value={currentTeacher.salary}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, salary: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Date of Joining</label>
              <input
                type="date"
                value={currentTeacher.dateOfJoining}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, dateOfJoining: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default TeacherSalary;
