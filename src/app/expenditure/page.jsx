'use client';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../components/Layouts/DefaultLayout';

function ExpenditureTracker() {
  // Preloaded dummy data
  const dummyData = [
    {
      id: 1,
      type: 'Teacher Salary',
      amount: 50000,
      date: '2024-12-01',
      purpose: 'Monthly salary for teaching staff.',
    },
    {
      id: 2,
      type: 'Building Construction and Maintenance',
      amount: 150000,
      date: '2024-12-10',
      purpose: 'Renovation of school auditorium.',
    },
    {
      id: 3,
      type: 'Transportation Salary',
      amount: 20000,
      date: '2024-12-15',
      purpose: 'Driver and maintenance staff payment.',
    },
    {
      id: 4,
      type: 'Lab Equipment',
      amount: 30000,
      date: '2024-11-20',
      purpose: 'Purchase of new lab microscopes.',
    },
    {
      id: 5,
      type: 'Domestic',
      amount: 8000,
      date: '2024-11-05',
      purpose: 'Electricity and water bills for the month.',
    },
  ];
  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await fetch('/api/expenditure');
        if (response.ok) {
          const data = await response.json();
          setExpenditures(data);
        } else {
          console.error('Failed to fetch expenditures.');
        }
      } catch (error) {
        console.error('Error fetching expenditures:', error);
      }
    };

    fetchExpenditures();
  }, []);

  const [expenditures, setExpenditures] = useState(dummyData);
  const [filter, setFilter] = useState('all'); // '1d', '3d', '1w', '1m', '3m', '1y', 'all'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpenditure, setNewExpenditure] = useState({
    type: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    image: null,
  });

  const today = new Date();

  const filterByRange = (dateString, range) => {
    const date = new Date(dateString);
    const diffInDays = (today - date) / (1000 * 60 * 60 * 24);

    switch (range) {
      case '1d': // Last 1 Day
        return diffInDays <= 1;
      case '3d': // Last 3 Days
        return diffInDays <= 3;
      case '1w': // Last 1 Week
        return diffInDays <= 7;
      case '1m': // Last 1 Month
        return diffInDays <= 30;
      case '3m': // Last 3 Months
        return diffInDays <= 90;
      case '1y': // Last 1 Year
        return diffInDays <= 365;
      default: // All
        return true;
    }
  };

  const filteredExpenditures = expenditures.filter((exp) => filterByRange(exp.date, filter));
  
  const totalExpenditure = filteredExpenditures.reduce((sum, exp) => sum + exp.amount, 0);

//   const handleAddExpenditure = () => {
//     const newId = expenditures.length > 0 ? expenditures[expenditures.length - 1].id + 1 : 1;
//     const newRecord = {
//       ...newExpenditure,
//       id: newId,
//       amount: parseFloat(newExpenditure.amount),
//     };

//     setExpenditures([...expenditures, newRecord]);
//     setShowAddModal(false);
//     setNewExpenditure({
//       type: '',
//       amount: '',
//       date: new Date().toISOString().split('T')[0],
//       purpose: '',
//       image: null,
//     });
//   };


    const handleAddExpenditure = async () => {
    try {
      const formData = new FormData();
      Object.keys(newExpenditure).forEach((key) => {
        if (newExpenditure[key]) formData.append(key, newExpenditure[key]);
      });

      const response = await fetch('/api/expenditure', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const addedExpenditure = await response.json();
        setExpenditures([...expenditures, addedExpenditure]);
        
        setNewExpenditure({
          type: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          purpose: '',
          image: null,
        });
      } else {
        console.error('Failed to add expenditure.');
      }
    } catch (error) {
      console.error('Error adding expenditure:', error);
    }
    setShowAddModal(false);
  };
  return (
    <DefaultLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Expenditure Tracker</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Add New Expenditure
          </button>
        </div>

        <div className="mb-6">
          <label className="font-semibold mr-4">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="1d">Last 1 Day</option>
            <option value="3d">Last 3 Days</option>
            <option value="1w">Last 1 Week</option>
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Filtered Expenditures</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">Exp ID</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenditures.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50">
                    <td className="border p-2">{exp.id}</td>
                    <td className="border p-2">{exp.type}</td>
                    <td className="border p-2">₹{exp.amount.toFixed(2)}</td>
                    <td className="border p-2">{exp.date}</td>
                    <td className="border p-2">{exp.purpose}</td>
                  </tr>
                ))}
                {filteredExpenditures.length === 0 && (
                  <tr>
                    <td colSpan="5" className="border p-2 text-center text-gray-500">
                      No expenditures found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold">
          Total Expenditure: ₹{totalExpenditure.toFixed(2)}
        </div>
         {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Expenditure</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Type</label>
              <select
                value={newExpenditure.type}
                onChange={(e) => setNewExpenditure({ ...newExpenditure, type: e.target.value })}
                className="w-full border rounded p-2"
              >
                <option value="">Select Type</option>
                <option value="Domestic">Domestic</option>
                <option value="Teacher Salary">Teacher Salary</option>
                <option value="Support Staff Salary">Support Staff Salary</option>
                <option value="Transportation Salary">Transportation Salary</option>
                <option value="Building Construction and Maintenance">
                  Building Construction and Maintenance
                </option>
                <option value="Lab Equipment">Lab Equipment</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Amount</label>
              <input
                type="number"
                value={newExpenditure.amount}
                onChange={(e) => setNewExpenditure({ ...newExpenditure, amount: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Purpose</label>
              <textarea
                value={newExpenditure.purpose}
                onChange={(e) => setNewExpenditure({ ...newExpenditure, purpose: e.target.value })}
                className="w-full border rounded p-2"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Upload Slip (Optional)</label>
              <input
                type="file"
                onChange={(e) =>
                  setNewExpenditure({ ...newExpenditure, image: e.target.files[0] })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpenditure}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DefaultLayout>
  );
}

export default ExpenditureTracker;

