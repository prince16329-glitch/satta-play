"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicTable = () => {
  const { slug } = useParams(); // ✅ slug yahan se milega
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/data?slug=${slug}`);
          const data = await res.json();
          setTableData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [slug]);

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
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
