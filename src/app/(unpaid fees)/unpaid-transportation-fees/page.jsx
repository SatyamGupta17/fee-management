'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

function UnpaidFeesReport() {
    const [studentData, setStudentData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Nursery');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const currentMonth = new Date().getMonth();

    const addresses = [
        { id: 1, name: "ORANGABAD" },
        { id: 2, name: "GAJROLA" },
        { id: 3, name: "MANDAWAR" },
        { id: 4, name: "RATANPUR" },
        { id: 5, name: "BILASPUR" },
        { id: 6, name: "GANJALPUR" },
        { id: 7, name: "KEWALPUR" },
        { id: 8, name: "DARGOPUR" },
        { id: 9, name: "GOPALPUR" },
        { id: 10, name: "DEVIDASWALA" },
        { id: 11, name: "NARAYANPUR" },
        { id: 12, name: "MOHIDINPUR" },
        { id: 13, name: "SHAHZADPUR" },
        { id: 14, name: "RAMJIWALA" },
        { id: 15, name: "SHEKHPURA" },
        { id: 16, name: "LALPUR" },
        { id: 17, name: "HUSSAINPUR" },
        { id: 18, name: "FATEHPUR" },
        { id: 19, name: "MODHIA DANSHI" },
        { id: 20, name: "KUNDANPUR" },
        { id: 21, name: "LAYAKPURI" },
        { id: 22, name: "RAGHUNATHPUR" },
        { id: 23, name: "QAZIWALA" },
        { id: 24, name: "JAHANGEER PUR" },
        { id: 25, name: "KISHANBAS" },
        { id: 26, name: "RAJARAMPUR" },
        { id: 27, name: "BHOJPUR" },
        { id: 28, name: "SAIFPUR KHADAR" }
      ];
      

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

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    'https://script.google.com/macros/s/AKfycbzo3fG0zLZPtSZg49iZNbitDmH6cqvzQP-pJEKygyOb7aVoE6Moiv4egAByyha-phW-/exec'
                );
                const data = response.data.data;
                if (Array.isArray(data)) {
                    setStudentData(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter Students based on selected class and address
    useEffect(() => {
        const filterStudents = () => {
            const filtered = studentData.filter((student) => {
                const isClassMatch =
                    selectedClass === '' || student.standard === selectedClass;
                const isAddressMatch = student.address.toLowerCase().includes(selectedAddress.toLowerCase());
                const isUnpaid =
                    student.numOfMonthTuitionFeeSubmitted < (currentMonth + 10) % 12;

                return isClassMatch && isAddressMatch && isUnpaid;
            });
            setFilteredStudents(filtered);
        };

        filterStudents();
    }, [selectedClass, selectedAddress, studentData]);

    // Handle Address Filter
    const handleInputChange = (input) => {
        setSelectedAddress(input);
        const filtered = addresses.filter((addr) =>
            addr.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredAddresses(filtered);
    };

    const handleInputClick = () => {
        setIsDropdownOpen(true);
        setFilteredAddresses(addresses); // Reset to all addresses
    };

    const handleOptionSelect = (selected) => {
        setSelectedAddress(selected);
        setIsDropdownOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => setIsDropdownOpen(false), 150);
    };

    const handleClassChange = (newClass) => {
        setSelectedClass(newClass);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <DefaultLayout>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="loader flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                        <span className="text-lg text-black-100 text-center">
                            Loading the details <br />
                            Please Wait ...
                        </span>
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
                        <div>
                            <label className="block text-sm font-medium mb-1">Filter by Address</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={selectedAddress}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onClick={handleInputClick}
                                    onBlur={handleBlur}
                                    className="border rounded p-2 w-full"
                                    placeholder="Type or select an address"
                                />
                                {isDropdownOpen && filteredAddresses.length > 0 && (
                                    <div className="absolute bg-white border rounded shadow-md mt-1 w-full z-10 max-h-40 overflow-y-auto p-2">
                                        {filteredAddresses.map((data) => (
                                            <div
                                                key={data.id}
                                                onClick={() => handleOptionSelect(data.name)}
                                                className="cursor-pointer p-2 hover:bg-gray-200"
                                            >
                                                {data.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Student List */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Father's Name</th>
                                        <th className="border p-2">Class</th>
                                        <th className="border p-2">Address</th>
                                        <th className="border p-2">Unpaid Months</th>
                                        <th className="border p-2">Unpaid Fees (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="border p-2">{student.name}</td>
                                                <td className="border p-2">{student.fatherName}</td>
                                                <td className="border p-2">{student.standard}</td>
                                                <td className="border p-2">{student.address}</td>
                                                <td className="border p-2">
                                                    {((currentMonth + 10) % 12) -
                                                        student.numOfMonthTuitionFeeSubmitted}
                                                </td>
                                                <td className="border p-2">
                                                    ₹
                                                    {student.monthlyTuitionFees *
                                                        (((currentMonth + 10) % 12) -
                                                            student.numOfMonthTuitionFeeSubmitted)}
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

export default UnpaidFeesReport;
