'use client';
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import { useState, useEffect } from 'react';

function StudentDetails({ params }) {
  const [studentDetails, setStudentDetails] = useState([]); 
  
  const [filteredData, setFilteredData] = useState([]);
  const  studentId = params.SrNo;
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbzo3fG0zLZPtSZg49iZNbitDmH6cqvzQP-pJEKygyOb7aVoE6Moiv4egAByyha-phW-/exec`);
        if (response.ok) {
          const data = await response.json();
          setStudentDetails(data);
        } else {
          alert('Failed to fetch student details.');
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);
  useEffect(() => {
    if (studentDetails.length > 0) {
        const newData = studentDetails.filter((student) => String(student.SrNo) === String(studentId));
        setFilteredData(newData);
    }
}, [studentDetails, studentId]);
  if (!studentDetails) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold text-gray-600">Loading student details...</p>
        </div>
      </DefaultLayout>
    );
  }

  const {
    name,
    fatherName,
    motherName,
    srNo,
    dob,
    address,
    standard,
    isTransportation,
    dateofAdmission,
    aadharNumber,
    studentContactNumber,
    parentContactNumber,
    guardianContactNumber,
    studentEmailId,
    parentEmailId,
    discountPercentTuitionFee,
    remarksTuitionFee,
    discountPercentTransportationFee,
    remarksTransportationFee,
  } = studentDetails;

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Student Details</h1>

        <div className="space-y-6">
          {/* Personal Details Section */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700">Name:</p>
                <p className="text-gray-900">{name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Father's Name:</p>
                <p className="text-gray-900">{fatherName}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Mother's Name:</p>
                <p className="text-gray-900">{motherName}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Sr No:</p>
                <p className="text-gray-900">{srNo}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date of Birth:</p>
                <p className="text-gray-900">{dob}</p>
              </div>
            </div>
          </div>

          {/* Academic Details Section */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700">Address:</p>
                <p className="text-gray-900">{address}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Standard:</p>
                <p className="text-gray-900">{standard}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date of Admission:</p>
                <p className="text-gray-900">{dateofAdmission}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Transportation:</p>
                <p className="text-gray-900">{isTransportation ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700">Student Contact Number:</p>
                <p className="text-gray-900">{studentContactNumber}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Parent Contact Number:</p>
                <p className="text-gray-900">{parentContactNumber}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Guardian Contact Number:</p>
                <p className="text-gray-900">{guardianContactNumber}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Student Email ID:</p>
                <p className="text-gray-900">{studentEmailId}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Parent Email ID:</p>
                <p className="text-gray-900">{parentEmailId}</p>
              </div>
            </div>
          </div>

          {/* Fee Details Section */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Fee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700">Tuition Fee Discount:</p>
                <p className="text-gray-900">{discountPercentTuitionFee}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Tuition Fee Remarks:</p>
                <p className="text-gray-900">{remarksTuitionFee}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Transportation Fee Discount:</p>
                <p className="text-gray-900">{discountPercentTransportationFee}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Transportation Fee Remarks:</p>
                <p className="text-gray-900">{remarksTransportationFee}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default StudentDetails;
