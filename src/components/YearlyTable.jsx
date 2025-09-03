const YearlyTable = ({ year, data }) => {
  // Months
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Days (1–31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-center">
        {/* Table Header */}
        <thead>
          <tr className="bg-gradientredblack text-white">
            {/* Sticky year column */}
            <th className="border px-3 py-2 sticky left-0 bg-gradientredblack z-10">
              {year}
            </th>
            {months.map((month, idx) => (
              <th key={idx} className="border px-3 py-2">
                {month}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              {/* Sticky day column */}
              <td className="border bg-gradientredblack text-white font-semibold px-3 py-2 sticky left-0 z-10">
                {day}
              </td>
              {months.map((month, idx) => (
                <td key={idx} className="border px-3 py-2 text-gray-700">
                  {data[month]?.[day] || "xx"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearlyTable;
