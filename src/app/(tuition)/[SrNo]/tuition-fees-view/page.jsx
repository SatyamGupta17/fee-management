'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import axios from 'axios';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import ReceiptGenerated from '../../receiptGenerated/page';

function TuitionFeesView({ params }) {
    const feePerMonth = 1000;
    const router = useRouter();
    const [studentData, setStudentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [monthsSubmitted, setMonthsSubmitted] = useState(0);
    const [numOfMonths, setNumOfMonths] = useState(0);
    const [totalFees, setTotalFees] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    // Function to handle fee submission
    const handleSubmitFees = () => {
        const updatedMonthsSubmitted = monthsSubmitted + numOfMonths;
        setMonthsSubmitted(updatedMonthsSubmitted);
        setShowAlert(true);
    };

    // Handle redirect to the ReceiptGenerated page
    const handleReceiptGenerated = () => {
        // Prepare data to send as query parameters
        const dataToSend = {
            name: filteredData[0]?.name || "",
            fatherName: filteredData[0]?.fatherName || "",
            standard: filteredData[0]?.standard || "",
            address: filteredData[0]?.address || "",
            totalAmount: totalFees || 0,
            monthsOfFeeSubmitted: monthsSubmitted || 0,
        };

        // Debugging output to verify the data
        console.log("Data to Send:", dataToSend);

        // Ensure the pathname and query are passed correctly
        // router.push(`/receiptGenerated`);
        setShowAlert(false);
        setTotalFees(0);
    };

    useEffect(() => {
        setTotalFees(numOfMonths * feePerMonth);
        setNumOfMonths(0);
    }, [monthsSubmitted]);

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
        if (studentData.length > 0) {
            const newData = studentData.filter((student) => String(student.SrNo) === String(params.SrNo));
            setFilteredData(newData);
        }
    }, [studentData, params.SrNo]);

    return (
        <DefaultLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="mb-6 bg-blue-100 border border-blue-500 p-4 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-700">Student Profile</h1>
                    <div className="mt-4 text-lg">
                        <p><strong>Name:</strong> {filteredData[0]?.name}</p>
                        <p><strong>Father's Name:</strong> {filteredData[0]?.fatherName}</p>
                        <p><strong>Class:</strong> {filteredData[0]?.standard}</p>
                        <p><strong>Address:</strong> {filteredData[0]?.address}</p>
                    </div>
                </div>

                {/* Fee Submission Section */}
                <div className="mb-6 bg-white border p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">Fee Submission</h2>

                    <div className="grid grid-cols-6 gap-2 mb-4">
                        {[
                            'April', 'May', 'June', 'July', 'August', 'September',
                            'October', 'November', 'December', 'January', 'February', 'March'
                        ].map((month, index) => (
                            <div
                                key={index}
                                className={`p-2 border rounded text-center ${index < monthsSubmitted ? 'bg-green-200' : 'bg-red-200'
                                    }`}
                            >
                                <span className="text-sm font-medium">{month}</span>
                                <br />
                                <span className="text-xs font-semibold">
                                    {index < monthsSubmitted ? 'Submitted' : 'Unsubmitted'}
                                </span>
                            </div>
                        ))}
                    </div>


                    {/* Fee Submission Input */}
                    <div className="mb-4">
                        <label className="text-lg font-semibold">Number of Months to Submit:</label>
                        <input
                            type="number"
                            className="mt-2 p-2 border border-gray-300 rounded"
                            value={numOfMonths}
                            onChange={(e) => setNumOfMonths(Number(e.target.value))}
                            min="0"
                            max={12 - monthsSubmitted}
                        />
                    </div>

                    <button
                        onClick={handleSubmitFees}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                    >
                        Submit Fees
                    </button>
                </div>

                {/* Total Fee Calculation */}
                <div className="mt-6 text-right">
                    <h3 className="text-xl font-bold">Total Fees Submitted: ₹{totalFees}</h3>
                </div>

                {/* Alert/Modal for Receipt Generation */}
                {showAlert && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">Fee Submission Confirmation</h2>
                            <p><strong>Name:</strong> {filteredData[0]?.name}</p>
                            <p><strong>Months of Fee Submitted:</strong> {monthsSubmitted}</p>
                            <p><strong>Total Amount:</strong> ₹{totalFees}</p>
                            <button
                                onClick={handleReceiptGenerated}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                            >
                                Receipt Generated
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}

export default TuitionFeesView;
