import { useState } from "react";
import { CalculateSuccessRate } from "../helpers/CalculateSuccessRate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../store";
import IVFPulseResult from "./IvfResult";
import { ChevronRight } from "lucide-react";

export function IVFCalculator() {
  const setResult = useStore((state) => state.setResult);
  const [cycles, setCycles] = useState(1);
  const [ageRange, setAgeRange] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [previousProcedures, setPreviousProcedures] = useState({
    icsi: "",
    pgt: "",
  });
  const [medicalConditions, setMedicalConditions] = useState({
    pcos: false,
    endometriosis: false,
    lowOvarianReserve: false,
    maleFactorInfertility: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !ageRange ||
        !cycles ||
        !previousProcedures.icsi ||
        !previousProcedures.pgt
      ) {
        toast("Please fill all the fields!", {
          type: "warning",
        });
        return;
      }

      const result = CalculateSuccessRate(
        ageRange,
        cycles,
        previousProcedures,
        medicalConditions
      );

      console.log(result)
      setResult(result);
      setShowResult(true);
    } catch (error) {
      toast("An error occurred", {
        type: "error",
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setMedicalConditions((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  if (showResult) {
    return <IVFPulseResult />;
  }

  return (
    <div className="px-4 py-6 border-4 border-yellow-400">
     <nav className="hidden xl:flex items-center space-x-2 text-sm text-muted-foreground ml-16">
      <a href="#" className="hover:text-foreground">
        Home
      </a>
      <ChevronRight className="h-4 w-4" />
      <span className='text-black font-medium'>IVF Success Rate Calculator</span>
    </nav>
    <div className="mx-auto max-w-4xl  overflow-hidden">
      <ToastContainer />
      <div className="p-6 sm:p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Age Range */}
          <div className="space-y-6">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Which age range applies to you?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                "Under 30",
                "Between 30 - 34",
                "Between 35 - 37",
                "Between 38 - 40",
                "Between 41 - 43",
                "Above 43",
              ].map((range) => (
                <div
                key={range}
                className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <input
                    type="radio"
                    id={range.toLowerCase().replace(/\s+/g, "-")}
                    name="age-range"
                    value={range}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-4 h-4 accent-[#e84c3d] focus:ring-[#e84c3d]"
                    />
                  <label
                    htmlFor={range.toLowerCase().replace(/\s+/g, "-")}
                    className={`text-sm sm:text-base font-medium text-gray-700 hover:text-[#e84c3d] transition ${
                      ageRange === range ? "font-semibold" : "font-normal"
                      }`}
                      >
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Number of IVF Cycles */}
          <div className="space-y-6">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Number of IVF Cycles?
            </h2>
            <div className="relative px-4">
              <div
                className="absolute top-[-25px] sm:top-[-30px] transform -translate-x-1/2 text-black font-medium bg-[#e84c3d] px-3 py-1 rounded-md text-sm"
                style={{ left: `calc(${(cycles - 1) * 25}% - 10px)` }}
                >
                {cycles}
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={cycles}
                onChange={(e) => setCycles(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#e84c3d] transition focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #e84c3d ${
                    (cycles - 1) * 25
                    }%, #e0e0e0 ${(cycles - 1) * 25}%)`,
                  }}
                  />
            </div>
          </div>

          {/* Previous Procedures */}
          <div className="space-y-6">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Have you undergone these procedures before?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "ICSI Procedure", name: "icsi" },
                { label: "PGT Testing", name: "pgt" },
              ].map(({ label, name }) => (
                <div key={name} className="space-y-2 flex items-center justify-between sm:justify-start gap-x-3">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 pt-1 sm:pt-2">
                    {label}:
                  </label>
                  <div className="flex space-x-4">
                    {["Yes", "No"].map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id={`${name}-${option.toLowerCase()}`}
                          name={name}
                          value={option}
                          onChange={(e) =>
                            setPreviousProcedures((prev) => ({
                              ...prev,
                              [name]: e.target.value,
                            }))
                          }
                          className="w-4 h-4 accent-[#e84c3d] focus:ring-[#e84c3d]"
                          />
                        <label
                          htmlFor={`${name}-${option.toLowerCase()}`}
                          className="text-sm sm:text-base text-gray-700 hover:text-[#e84c3d] transition"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-6">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Do you have any of these medical conditions?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "PCOS",
                "Endometriosis",
                "Low Ovarian Reserve",
                "Male Factor Infertility",
              ].map((condition) => (
                <div
                key={condition}
                className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    id={condition.toLowerCase().replace(/\s+/g, "-")}
                    value={condition.toLowerCase().replace(/\s+/g, "-")}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 accent-[#e84c3d]"
                    />
                  <label
                    htmlFor={condition.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm sm:text-base  text-gray-700"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-[#e84c3d] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#d44637] transition transform hover:scale-105"
              >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
              </div>
  );
}
