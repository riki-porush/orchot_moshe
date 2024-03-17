// import React, { useEffect, useState } from "react";
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
//   Legend,
// } from "recharts";
// import "./App.css";
// import studentsData from "./data.json";
// import finalLogo from "./logoFinal.png";
// import HomePage from "./home";
// import OMHeader from "./header.js";

// const SplitBarChart = () => {

//   const groupedData = studentsData.reduce((acc, student) => {
//     const { grade, gradeNum, donation } = student;
//     const groupKey = `${grade} - ${gradeNum}`;
//     if (!acc[groupKey]) {
//       acc[groupKey] = {
//         grade,
//         gradeNum,
//         totalDonation: 0,
//         color: null,
//       };
//     }
//     acc[groupKey].totalDonation += Number(donation);
//     return acc;
//   }, {});
//   const colors = ["#1B4C47", "#6D9B97", "#B29462", "#E4CC8E", "#8F734D", "#246860"];
//     Object.values(groupedData).forEach((entry, index) => {
//     entry.color = colors[index % colors.length];
//   });

//   //progress pie
//   const target = 4000000;
//   const colors2 = ["#0088FE", "#00C49F"];
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
//   <OMHeader/>
//       </header>
//       <div className="card-container">
//       <div className="space" width="70%">
//         <ResponsiveContainer height={400} className="charts graph-container custom-card">
//           <BarChart
//             data={Object.values(groupedData)}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//             fontFamily="'Segoe UI Semibold', sans-serif"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={(entry) => `${entry.grade} ${entry.gradeNum}`} />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="totalDonation" fill="#6D9B97" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="space" width="30%">
//         <ResponsiveContainer width="100%" height={300} className="charts graph-container custom-card">
//           <PieChart>
//             <Legend
//               align="center"
//               verticalAlign="bottom"
//               iconSize={10}
//               payload={Object.values(groupedData).map((entry, index) => ({
//                 value: `${entry.grade} ${entry.gradeNum}`,
//                 type: "square",
//                 color: entry.color,
//               }))}
//               style={{ fontFamily: 'Segoe UI Semibold, sans-serif', fontSize: '16px', fontWeight: 'bold' }}
//             />
//             <Pie
//               data={Object.values(groupedData)}
//               dataKey="totalDonation"
//               nameKey="grade"
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               label = {{
//                 fontSize: '16px',
//                 fontFamily: 'Segoe UI Semibold, sans-serif',
//                 fill: '#C8C1C1'
//               }}
//             >
//               {Object.values(groupedData).map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       </div>
//       <footer></footer>
//     </div>
//   );
// };

// export default SplitBarChart;
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
  Legend,
} from "recharts";
import "./App.css";
import OMHeader from "./header.js";

const SplitBarChart = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setStudentsData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupedData = studentsData.reduce((acc, student) => {
    const { grade, gradeNum, donation } = student;
    const groupKey = `${grade} - ${gradeNum}`;
    if (!acc[groupKey]) {
      acc[groupKey] = {
        grade,
        gradeNum,
        totalDonation: 0,
        color: null,
      };
    }
    acc[groupKey].totalDonation += Number(donation);
    return acc;
  }, {});
  
  const colors = ["#1B4C47", "#6D9B97", "#B29462", "#E4CC8E", "#8F734D", "#246860"];
  Object.values(groupedData).forEach((entry, index) => {
    entry.color = colors[index % colors.length];
  });

  //progress pie
  const target = 4000000;
  const colors2 = ["#0088FE", "#00C49F"];
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
        <OMHeader/>
      </header>
      <div className="card-container">
        <div className="space" width="70%">
          <ResponsiveContainer height={400} className="charts graph-container custom-card">
            <BarChart
              data={Object.values(groupedData)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              fontFamily="'Segoe UI Semibold', sans-serif"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={(entry) => `${entry.grade} ${entry.gradeNum}`} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalDonation" fill="#6D9B97" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space" width="30%">
          <ResponsiveContainer width="100%" height={300} className="charts graph-container custom-card">
            <PieChart>
              <Legend
                align="center"
                verticalAlign="bottom"
                iconSize={10}
                payload={Object.values(groupedData).map((entry, index) => ({
                  value: `${entry.grade} ${entry.gradeNum}`,
                  type: "square",
                  color: entry.color,
                }))}
                style={{ fontFamily: 'Segoe UI Semibold, sans-serif', fontSize: '16px', fontWeight: 'bold' }}
              />
              <Pie
                data={Object.values(groupedData)}
                dataKey="totalDonation"
                nameKey="grade"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label = {{ 
                  fontSize: '16px', 
                  fontFamily: 'Segoe UI Semibold, sans-serif', 
                  fill: '#C8C1C1' 
                }}
              >
                {Object.values(groupedData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default SplitBarChart;
