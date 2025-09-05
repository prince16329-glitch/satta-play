"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import Heading from "@/components/common/Heading";
import YearlyTable from "@/components/YearlyTable";

const DynamicTable = () => {
  const { slug } = useParams();
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState(false);
  console.log(slug, "slug")
  const yearlyData = {
    JAN: { 1: 84, 2: "08", 3: "10" },
    FEB: { 1: 99, 2: 50, 3: 20 },
    MAR: { 1: 46, 2: 35, 3: 45 },
  };

  if (error) return <NotFound />; // ✅ custom not-found render hoga
   const title = slug.toUpperCase().replace(/-/g, " ");

  // if (!tableData) return <p>Loading...</p>;

  return (
    <div>
      <Heading title={title} />
      <div className="container mx-auto px-4 py-6">
        <YearlyTable year="2025" data={yearlyData} />
      </div>
    </div>
  );
};

export default DynamicTable;
