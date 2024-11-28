import { IVFCalculator } from "./components/Ivf-Calculator";
import { MainNav } from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b w-full">
        <div className={`flex h-16 items-center px-4`}>
          <MainNav />
        </div>
      </header>
      <main className={` w-full bg-[#f8f6ec]`}>
        <IVFCalculator />
      </main>
    </div>
  );
};

export default App;
