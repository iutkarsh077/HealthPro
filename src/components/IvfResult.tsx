import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { IVFCalculator } from "./Ivf-Calculator";
import useStore from "../store";

export default function IVFPulseResult() {
  const result = useStore((state) => state.result);
  const radius = 45; // Percentage radius
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - result / 100);
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return <IVFCalculator />;
  }

  return (
    <div className="h-auto min-h-screen bg-[#303030] text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-white mb-8 xl:block hidden">
          <span className="hover:text-white cursor-pointer" onClick={() => setShowCalculator(true)}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-white cursor-pointer" onClick={() => setShowCalculator(true)}>
            IVF Success Rate Calculator
          </span>
          <span className="mx-2">/</span>
          <span className="font-semibold" onClick={() => setShowCalculator(true)}>Result</span>
        </div>

        {!showCalculator && (
          <div
            className="text-base text-white mb-8 xl:hidden block"
            onClick={() => setShowCalculator(true)}
          >
            <span className="hover:text-white font-medium cursor-pointer flex gap-x-3">
              <MoveLeft /> IVF Success Rate Calculator
            </span>
          </div>
        )}

        {/* Result Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-medium flex items-center gap-3 ">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              Your estimated IVF Success Rate is
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:ml-10">
            {/* Success Rate Circle */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-84 lg:h-84">
              <svg
                className="w-full h-full transform mx-auto -rotate-90"
                width="200"
                height="200"
                viewBox="0 0 100 100"
              >
                {/* Background Circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#3d614b"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#5bd489"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  {result}%
                </span>
                <span className="text-white mt-2 text-sm sm:text-base lg:mt-3">
                  With 1 IVF Cycle
                </span>
              </div>
            </div>

            {/* Image Section */}
            <div className="h-auto relative  w-full sm:max-w-md lg:max-w-2xl mx-auto">
              <img
                src="Parents.jpg"
                alt="IVF Success"
                className="w-full h-auto lg:p-10 rounded-lg object-contain"
              />

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
