import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DynamicTable = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (slug) {
      // Simulate fetching data based on slug
      const fetchData = async () => {
        const data = await fetch(`/api/data?slug=${slug}`).then((res) => res.json());
        setTableData(data);
      };
      fetchData();
    }
  }, [slug]);

  return (
    <div>
      <h1>Data for: {slug}</h1>
      <table>
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