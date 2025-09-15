import { notFound } from "next/navigation";
import Heading from "@/components/common/Heading";
import YearlyTable from "@/components/YearlyTable";
import { 
  getYearlyResults, 
  transformYearlyData, 
  citySlugMapping, 
  parseSlugData 
} from "@/services/result";

const DynamicTable = async ({ params }) => {
  const { slug } = params;
  
  // Get city key and display info from slug
  const cityKey = citySlugMapping[slug];
  const slugData = parseSlugData(slug);
  
  if (!cityKey || !slugData) {
    notFound();
  }

  const { name: cityName, year } = slugData;

  // Fetch yearly data from Sanity
  const results = await getYearlyResults(cityKey, year);
  const yearlyData = transformYearlyData(results);

  return (
    <div>
      <Heading title={`${cityName} YEARLY CHART ${year}`} />
      <div className="mx-auto px-4 py-6">
        <YearlyTable year={year} data={yearlyData} />
      </div>
    </div>
  );
};

export default DynamicTable;