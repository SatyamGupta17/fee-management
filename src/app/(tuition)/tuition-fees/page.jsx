'use client';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import {useRouter} from 'next/navigation';

function TutionFee() { 
  const router = useRouter();
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [standard, setStandard] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const standards = [
    { id: 1, name: 'NURSERY' },
    { id: 2, name: 'LKG' },
    { id: 3, name: 'UKG' },
    { id: 4, name: '1ST' },
    { id: 5, name: '2ND' },
    { id: 6, name: '3RD' },
    { id: 7, name: '4TH' },
    { id: 8, name: '5TH' },
    { id: 9, name: '6TH' },
    { id: 10, name: '7TH' },
    { id: 11, name: '8TH' },
    { id: 12, name: '9TH' },
    { id: 13, name: '10TH' },
    { id: 14, name: '11TH' },
    { id: 15, name: '12TH' },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.VITE_SERVER_URL, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      const data = response.data.data;
      
      if (Array.isArray(data)) {
        setStudentData(data);
        console.log(data); // Log to check the structure of data
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = studentData || [];  // Ensure it's an array, even if studentData is undefined
  
    if (standard) {
      data = data.filter((student) => student.standard === standard);
    }
    if (name) {
      data = data.filter((student) => student.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (fatherName) {
      data = data.filter((student) => student.fatherName.toLowerCase().includes(fatherName.toLowerCase()));
    }
    if (address) {
      data = data.filter((student) => student.address.toLowerCase().includes(address.toLowerCase()));
    }
  
    setFilteredData(data);  // Set filtered data which is guaranteed to be an array
    setCurrentPage(1);
  }, [standard, name, fatherName, address, studentData]);
  

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredData) ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <DefaultLayout>
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col items-center justify-center mb-6 bg-blue-100 border border-blue-500 p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-blue-700">Tuition Fees</h1>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        >
          <option value="">Select Class</option>
          {standards.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        

        <input
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Father's Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />

        <input
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {currentItems.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Father Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">View Profile</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-3 border text-center">{data.name}</td>
                <td className="p-3 border text-center">{data.fatherName}</td>
                <td className="p-3 border text-center">{data.standard}</td>
                <td className="p-3 border text-center">{data.address}</td>
                <td className="p-3 border text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                    onClick={() => router.push(`/${data.SrNo}/tuition-fees-view`)}
                  >
                    Click here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No data found for the selected filters.</p>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </DefaultLayout>
  );
}

export default TutionFee;
