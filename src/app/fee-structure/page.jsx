'use client';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import DefaultLayout from '../../components/Layouts/DefaultLayout';

function FeesStructure() {
  const [currentView, setCurrentView] = useState('tuition'); // 'tuition' or 'transportation'

  const [tuitionFees, setTuitionFees] = useState({
    2024: [
      { class: '1', fees: 2000 },
      { class: '2', fees: 2200 },
      { class: '3', fees: 2400 },
      { class: '4', fees: 2600 },
      { class: '5', fees: 2800 },
    ],
    2023: [
      { class: '1', fees: 1800 },
      { class: '2', fees: 2000 },
      { class: '3', fees: 2200 },
      { class: '4', fees: 2400 },
      { class: '5', fees: 2600 },
    ],
  });

  const [transportFees, setTransportFees] = useState({
    2024: [
      { village: 'Greenwood', distance: 5, fees: 800 },
      { village: 'Sunnyvale', distance: 10, fees: 1200 },
      { village: 'Riverside', distance: 15, fees: 1500 },
      { village: 'Riveral', distance: 15, fees: 1500 },
      { village: 'Rivree', distance: 15, fees: 1500 },
    ],
  });

  const [yearFilter, setYearFilter] = useState(1);
  const [searchVillage, setSearchVillage] = useState('');

  const getFilteredTuitionFees = () => {
    const currentYear = new Date().getFullYear();
    return Object.keys(tuitionFees)
      .filter((year) => currentYear - year <= yearFilter)
      .reduce((acc, year) => ({ ...acc, [year]: tuitionFees[year] }), {});
  };

  const getFilteredTransportFees = () => {
    const currentYear = new Date().getFullYear();
    const currentTransportFees = transportFees[currentYear] || [];
    return currentTransportFees.filter(({ village }) =>
      village.toLowerCase().includes(searchVillage.toLowerCase())
    );
  };

  return (
    <DefaultLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Fees Structure</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setCurrentView('tuition')}
            className={`px-6 py-2 rounded-l-lg ${
              currentView === 'tuition'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Tuition Fees
          </button>
          <button
            onClick={() => setCurrentView('transportation')}
            className={`px-6 py-2 rounded-r-lg ${
              currentView === 'transportation'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Transportation Fees
          </button>
        </div>

        {/* Tuition Fees Section */}
        {currentView === 'tuition' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Tuition Fees</h2>
              <button
                onClick={() => alert('Add Tuition Fees Modal (Placeholder)')}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                Add Tuition Fees
              </button>
            </div>
            <div className="mb-4">
              <label className="font-semibold mr-4">Show Fees for Last:</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(Number(e.target.value))}
                className="border rounded p-2"
              >
                <option value={1}>1 Year</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
              </select>
            </div>
            {Object.keys(getFilteredTuitionFees()).map((year) => (
              <div key={year} className="mb-6">
                <h3 className="text-xl font-bold text-gray-700">{year}</h3>
                <table className="table-auto w-full border-collapse border border-gray-200 mt-2">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="border p-2">Class</th>
                      <th className="border p-2">Monthly Fees (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionFees[year].map((fee) => (
                      <tr key={fee.class} className="hover:bg-gray-50">
                        <td className="border p-2">{fee.class}</td>
                        <td className="border p-2">₹{fee.fees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* Transportation Fees Section */}
        {currentView === 'transportation' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Transportation Fees</h2>
              <button
                onClick={() => alert('Add Transportation Fees Modal (Placeholder)')}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                Add Transportation Fees
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by village name..."
                value={searchVillage}
                onChange={(e) => setSearchVillage(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">Village</th>
                  <th className="border p-2">Distance (km)</th>
                  <th className="border p-2">Transportation Fees (₹)</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredTransportFees().map(({ village, distance, fees }) => (
                  <tr key={village} className="hover:bg-gray-50">
                    <td className="border p-2">{village}</td>
                    <td className="border p-2">{distance} km</td>
                    <td className="border p-2">₹{fees}</td>
                  </tr>
                ))}
                {getFilteredTransportFees().length === 0 && (
                  <tr>
                    <td colSpan="3" className="border p-2 text-center text-gray-500">
                      No villages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default FeesStructure;
