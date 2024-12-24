'use client';
import { useSearchParams } from 'next/navigation';

function ReceiptGenerated() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const fatherName = searchParams.get('fatherName');
  const standard = searchParams.get('standard');
  const address = searchParams.get('address');
  const totalAmount = searchParams.get('totalAmount');
  const monthsOfFeeSubmitted = searchParams.get('monthsOfFeeSubmitted');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white border p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Fee Receipt</h1>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Father&apos;s Name:</strong> {fatherName}</p>
        <p><strong>Class:</strong> {standard}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Total Amount Paid:</strong> ₹{totalAmount}</p>
        <p><strong>Months of Fee Submitted:</strong> {monthsOfFeeSubmitted}</p>
      </div>
    </div>
  );
}

export default ReceiptGenerated;
