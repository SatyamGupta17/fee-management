'use client';
import { useState, useEffect} from 'react';
import axios from 'axios'; 
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

function UnpaidTuitionFeesReport() {
  // Sample dummy data 
  const [studentData, setStudentData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('Nursery'); // 'all' for all classes
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentMonth = new Date().getMonth();
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
  // Filter students based on duration and class
  useEffect(() => {
    const filterStudents = () => {
      const filtered = studentData.filter((student) => {
        const isClassMatch = selectedClass === '' || student.standard === selectedClass;
        const isUnpaid = student.numOfMonthTuitionFeeSubmitted < (currentMonth + 10) % 12;
        return isClassMatch && isUnpaid;
      });
      setFilteredStudents(filtered);
    };
  
    filterStudents();
  }, [selectedClass, studentData, currentMonth]);  
  // Handle class change
  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
  };

  // Print the report
  const handlePrint = () => {
    window.print();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://script.google.com/macros/s/AKfycbzo3fG0zLZPtSZg49iZNbitDmH6cqvzQP-pJEKygyOb7aVoE6Moiv4egAByyha-phW-/exec', {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      const data = response.data.data;
      
      if (Array.isArray(data)) {
        setStudentData(data); 
        filterStudents();
        console.log(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <DefaultLayout>
       {isLoading ? (
          <div className="flex items-center justify-center h-screen">
          <div className="loader flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className="text-lg text-black-100 text-center">Loading the details <br />Please Wait ...</span>
          </div>
        </div>
        ) : (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Unpaid Fees Report</h1>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            Print Report
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Class</label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="border rounded p-2 w-40"
            >
              <option value="">Select Class</option>
                {standards.map((data) => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Father&apos;s Name</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Number of Unpaid Fees</th>
                  <th className="border p-2">Amount of Unpaid Fees (₹)</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">{student.fatherName}</td>
                      <td className="border p-2">{student.standard}</td>
                      <td>{student.address}</td> 
                      <td className="border p-2">
                        {((currentMonth + 10) % 12 - student.numOfMonthTuitionFeeSubmitted)}
                      </td>
                      <td className="border p-2">
                        ₹{student.monthlyTuitionFees * ((currentMonth + 10) % 12  - student.numOfMonthTuitionFeeSubmitted)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-gray-500 p-4 border"
                    >
                      No students with unpaid fees for this duration and class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
    </DefaultLayout>
  );
}

export default UnpaidTuitionFeesReport;
