"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";

const DynamicTable = () => {
  const { slug } = useParams();
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/data?slug=${slug}`);
          if (!res.ok) {
            setError(true);
            return;
          }
          const data = await res.json();
          if (!data || data.length === 0) {
            setError(true);
            return;
          }
          setTableData(data);
        } catch (e) {
          setError(true);
        }
      };
      fetchData();
    }
  }, [slug]);

  if (error) return <NotFound />; // ✅ custom not-found render hoga

  if (!tableData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data for: {slug}</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
