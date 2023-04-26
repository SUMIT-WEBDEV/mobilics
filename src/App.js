import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Loader from "./Loader/Loader";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://mobilics-delta.vercel.app/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [setData]);

  const groupedData = useMemo(() => {
    return data.reduce((acc, item) => {
      const city = item.city;
      const income = parseFloat(item.income.slice(1));
      if (city in acc) {
        acc[city].count += 1;
        acc[city].totalIncome += income;
      } else {
        acc[city] = { count: 1, totalIncome: income };
      }
      return acc;
    }, {});
  }, [data]);

  const sortedData = useMemo(() => {
    return Object.keys(groupedData)
      .sort((a, b) => groupedData[b].count - groupedData[a].count)
      .slice(0, 10)
      .map((city) => {
        const count = groupedData[city].count;
        const averageIncome = `$${(
          groupedData[city].totalIncome / count
        ).toFixed(2)}`;
        return { city, count, averageIncome };
      });
  }, [groupedData]);

  return (
    <>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Count</th>
              <th>Average Income</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.city}</td>
                <td>{item.count}</td>
                <td>{item.averageIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
