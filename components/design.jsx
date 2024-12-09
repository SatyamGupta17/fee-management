import Image from 'next/image';
import Image1 from '../images/1.jpg';
import Image2 from '../images/2.jpg';
import Image3 from '../images/3.jpg';
import './globals.css'
const FeeManagementSteps = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-8 py-12">
      {/* Daily Fee Collection */}
      <div className="flex flex-col items-center text-center border-4 border-purple-500 rounded-lg p-6 shadow-md w-72 h-80">
        <div className="w-32 h-32">
          <Image
            src={Image1}
            alt="Daily Fee Collection"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-bold mt-4">DAILY FEE COLLECTION</h3>
      </div>

      {/* Fee Report */}
      <div className="flex flex-col items-center text-center border-4 border-red-500 rounded-lg p-6 shadow-md w-72 h-80">
        <div className="w-32 h-32">
          <Image
            src={Image2}
            alt="Fee Report"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-bold mt-4">FEE REPORT</h3>
      </div>

      {/* Fee Register */}
      <div className="flex flex-col items-center text-center border-4 border-yellow-500 rounded-lg p-6 shadow-md w-72 h-80">
        <div className="w-32 h-32">
          <Image
            src={Image3}
            alt="Fee Register"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-bold mt-4">FEE REGISTER</h3>
      </div>
    </div>
  );
};

export default FeeManagementSteps;
