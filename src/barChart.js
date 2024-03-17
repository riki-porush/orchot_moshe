// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from "recharts";
// import "./App.css";
// import studentsData from "./data.json";
// import OMHeader from "./header.js";

// const BarScreen = () => {


//   const groupedByGrade = studentsData.reduce((acc, student) => {
//     const { grade, donation } = student;
//     if (!acc[grade]) {
//       acc[grade] = {
//         grade,
//         totalDonation: 0,
//         color: null,
//       };
//     }
//     acc[grade].totalDonation += Number(donation);
//     return acc;
//   }, {});
//   const colors = ["#1B4C47", "#6D9B97", "#B29462", "#E4CC8E", "purple", "pink"];
//   Object.values(groupedByGrade).forEach((entry, index) => {
//     entry.color = colors[index % colors.length];
//   });

//   const groupedData = Object.values(groupedByGrade);

//   const target = 4000000;
//   const colors2 = ["#C1B887", "#6C5C53"];
//   const [progressData, setProgressData] = useState([]);
//   useEffect(() => {
//     const totalDonation = studentsData.reduce(
//       (acc, student) => acc + Number(student.donation),
//       0
//     );
//     setProgressData([
//       { name: "Progress", value: totalDonation },
//       { name: "Remaining", value: target - totalDonation },
//     ]);
//   }, [studentsData]);

//   return (
//     <div>
//       <header>
//         <header>
//           <OMHeader />
//         </header>
//       </header>
//       <div className="card-container">
//         <div className="space" width="70%">
//           <ResponsiveContainer height={300} className="charts graph-container">
//             <BarChart
//               data={groupedData}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//               fontFamily="'Segoe UI Semibold', sans-serif"
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="grade" type="category" fontFamily="Roboto, sans-serif" />
//               <YAxis fontFamily="'Segoe UI Semibold', sans-serif" />
//               <Tooltip />
//               <Bar dataKey="totalDonation" fill="#6D9B97" />
//               <Bar name="Total Donation Amount" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="space" width="30%">
//           <ResponsiveContainer height={300} className="charts graph-container .card-container">
//             <PieChart>
//               <Legend
//                 align="center"
//                 verticalAlign="bottom"
//                 iconSize={15}
//                 payload={Object.values(groupedData).map((entry, index) => ({
//                   value: entry.grade,
//                   type: "square",
//                   color: entry.color,
//                 }))}
//                 style={{ fontFamily: 'Segoe UI Semibold, sans-serif', fontSize: '16px', fontWeight: 'bold' }}

//               />
//               <Pie
//                 data={groupedData}
//                 dataKey="totalDonation"
//                 nameKey="grade"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 label={{
//                   fontSize: '16px',
//                   fontFamily: 'Segoe UI Semibold, sans-serif',
//                   fill: '#C8C1C1'
//                 }}
//                 innerRadius={30}
//                 paddingAngle={3}
//                 cornerRadius={2}
//                 startAngle={-179}
//                 endAngle={180}
//               >
//                 {groupedData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarScreen;
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import "./App.css";
import OMHeader from "./header.js";

const BarScreen = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data.json');
        const jsonData = await response.json();
        setStudentsData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedByGrade = studentsData.reduce((acc, student) => {
    const { grade, donation } = student;
    if (!acc[grade]) {
      acc[grade] = {
        grade,
        totalDonation: 0,
        color: null,
      };
    }
    acc[grade].totalDonation += Number(donation);
    return acc;
  }, {});
  const colors = ["#1B4C47", "#6D9B97", "#B29462", "#E4CC8E", "purple", "pink"];
  Object.values(groupedByGrade).forEach((entry, index) => {
    entry.color = colors[index % colors.length];
  });

  const groupedData = Object.values(groupedByGrade);

  const target = 4000000;
  const colors2 = ["#C1B887", "#6C5C53"];
  const [progressData, setProgressData] = useState([]);
  useEffect(() => {
    const totalDonation = studentsData.reduce(
      (acc, student) => acc + Number(student.donation),
      0
    );
    setProgressData([
      { name: "Progress", value: totalDonation },
      { name: "Remaining", value: target - totalDonation },
    ]);
  }, [studentsData]);

  return (
    <div>
      <header>
        <OMHeader />
      </header>
      <div className="card-container">
        <div className="space" width="70%">
          <ResponsiveContainer height={300} className="charts graph-container">
            <BarChart
              data={groupedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              fontFamily="'Segoe UI Semibold', sans-serif"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" type="category" fontFamily="Roboto, sans-serif" />
              <YAxis fontFamily="'Segoe UI Semibold', sans-serif" />
              <Tooltip />
              <Bar dataKey="totalDonation" fill="#6D9B97" />
              <Bar name="Total Donation Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space" width="30%">
          <ResponsiveContainer height={300} className="charts graph-container .card-container">
            <PieChart>
              <Legend
                align="center"
                verticalAlign="bottom"
                iconSize={15}
                payload={Object.values(groupedData).map((entry, index) => ({
                  value: entry.grade,
                  type: "square",
                  color: entry.color,
                }))}
                style={{ fontFamily: 'Segoe UI Semibold, sans-serif', fontSize: '16px', fontWeight: 'bold' }}
              />
              <Pie
                data={groupedData}
                dataKey="totalDonation"
                nameKey="grade"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={{
                  fontSize: '16px',
                  fontFamily: 'Segoe UI Semibold, sans-serif',
                  fill: '#C8C1C1'
                }}
                innerRadius={30}
                paddingAngle={3}
                cornerRadius={2}
                startAngle={-179}
                endAngle={180}
              >
                {groupedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarScreen;
