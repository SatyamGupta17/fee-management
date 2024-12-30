'use client';
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';

function UpdateStudentDetails({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    srNo: '',
    dob: '',
    address: '',
    standard: '',
    isTransportation: false,
    dateofAdmission: '',
    aadharNumber: '',
    studentContactNumber: '',
    parentContactNumber: '',
    guardianContactNumber: '',
    studentEmailId: '',
    parentEmailId: '',
    discountPercentTuitionFee: 0,
    remarksTuitionFee: '',
    discountPercentTransportationFee: 0,
    remarksTransportationFee: '',
  });
  const studentId = params.SrNo;
  const addressOptions = ['Address 1', 'Address 2', 'Address 3', 'Address 4'];
  const standards = [
    { id: 1, name: 'Nursery' },
    { id: 2, name: 'L.K.G' },
    { id: 3, name: 'U.K.G' },
    { id: 4, name: '1st' },
    { id: 5, name: '2nd' },
    { id: 6, name: '3rd' },
    { id: 7, name: '4th' },
    { id: 8, name: '5th' },
    { id: 9, name: '6th' },
    { id: 10, name: '7th' },
    { id: 11, name: '8th' },
    { id: 12, name: '9th' },
    { id: 13, name: '10th' },
    { id: 14, name: '11th' },
    { id: 15, name: '12th' },
  ];
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`/api/student/${studentId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          alert('Failed to fetch student details.');
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Student details updated successfully!');
      } else {
        alert('Failed to update student details.');
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      alert('Error updating student details.');
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
        <h1 className="flex justify-center text-3xl font-bold mb-6 text-blue-700">
          Update Student Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address and Standard Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Address & Class</h2>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Address</label>
              <select
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Address</option>
                {addressOptions.map((address) => (
                  <option key={address} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1 text-gray-700">Class</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Standard</option>
                {standards.map((standard, index) => (
                  <option key={index} value={standard.name}>
                    {standard.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Student Contact Number</label>
                <input
                  type="number"
                  name="studentContactNumber"
                  value={formData.studentContactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Parent Contact Number</label>
                <input
                  type="number"
                  name="parentContactNumber"
                  value={formData.parentContactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Guardian Contact Number</label>
                <input
                  type="number"
                  name="guardianContactNumber"
                  value={formData.guardianContactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Student Email ID</label>
                <input
                  type="email"
                  name="studentEmailId"
                  value={formData.studentEmailId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Parent Email ID</label>
                <input
                  type="email"
                  name="parentEmailId"
                  value={formData.parentEmailId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Tuition Fees Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tuition Fees</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Discount Percent</label>
                <input
                  type="number"
                  name="discountPercentTuitionFee"
                  value={formData.discountPercentTuitionFee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Remarks</label>
                <input
                  type="text"
                  name="remarksTuitionFee"
                  value={formData.remarksTuitionFee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Transportation Fees Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Transportation Fees</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Discount Percent</label>
                <input
                  type="number"
                  name="discountPercentTransportationFee"
                  value={formData.discountPercentTransportationFee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Remarks</label>
                <input
                  type="text"
                  name="remarksTransportationFee"
                  value={formData.remarksTransportationFee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default UpdateStudentDetails;
