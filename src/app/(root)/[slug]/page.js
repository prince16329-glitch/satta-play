import { notFound } from "next/navigation";
import Heading from "@/components/common/Heading";
import YearlyTable from "@/components/YearlyTable";
import {
  getYearlyResults,
  transformYearlyData,
  gameSlugMapping,
  parseSlugData
} from "@/services/result";

const DynamicTable = async ({ params }) => {
  const { slug } = params;

  // Get game key and display info from slug
  const gameKey = gameSlugMapping[slug];
  const slugData = parseSlugData(slug);

  if (!gameKey || !slugData) {
    notFound();
  }

  const { name: gameName, year } = slugData;

  // Fetch yearly data from Sanity
  const results = await getYearlyResults(gameKey, year);
  const yearlyData = transformYearlyData(results);

  return (
    <div>
      <Heading title={`${gameName} YEARLY CHART ${year}`} />
      <div className="mx-auto px-4 py-6">
        <YearlyTable year={year} data={yearlyData} />
      </div>
    </div>
  );
};

export default DynamicTable;