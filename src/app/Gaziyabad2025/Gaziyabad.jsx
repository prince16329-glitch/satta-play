import Heading from "@/components/common/Heading";
import YearlyTable from "@/components/YearlyTable";

const Gaziyabad = () => {
  // Example dummy data (sirf kuch values)
  const yearlyData = {
    JAN: { 1: 84, 2: "08", 3: "10" },
    FEB: { 1: 99, 2: 50, 3: 20 },
    MAR: { 1: 46, 2: 35, 3: 45 },
    // baki months khali rehne do
  };

  return (
    <>
      <Heading title="Gaziyabad YEARLY CHART 2025" />
      <div className="container mx-auto px-4 py-6">
        <YearlyTable year="2025" data={yearlyData} />
      </div>
    </>
  );
};

export default Gaziyabad;
