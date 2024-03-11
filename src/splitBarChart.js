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
import studentsData from "./data.json";
import finalLogo from "./logoFinal.png";
import HomePage from "./home";
import OMHeader from "./header.js";

const SplitBarChart = () => {
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
// import * as React from 'react';
// import Stack from '@mui/joy/Stack';
// import Button from '@mui/joy/Button';
// import Typography from '@mui/joy/Typography';
// import CircularProgress from '@mui/joy/CircularProgress';
// import { useCountUp } from 'use-count-up';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// export default function CircularProgressCountUp() {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [buttonLabel, setButtonLabel] = React.useState('Start');

//   const { value: value1, reset: resetValue1 } = useCountUp({
//     isCounting: isLoading,
//     duration: 1,
//     start: 0,
//     end: 25,
//     onComplete: () => {
//       setIsLoading(false);
//       setButtonLabel('Reset');
//     },
//   });

//   const { value: value2, reset } = useCountUp({
//     isCounting: true,
//     duration: 1,
//     start: 0,
//     end: 75,
//   });

//   const handleButtonClick = () => {
//     if (isLoading) {
//       setIsLoading(false);
//       setButtonLabel('Start');
//       resetValue1();
//     } else if (buttonLabel === 'Reset') {
//       setButtonLabel('Start');
//       resetValue1();
//     } else {
//       setIsLoading(true);
//       setButtonLabel('Reset');
//     }
//   };

//   // Data for progress pie chart
//   const target = 4000000;
//   const colors2 = ["#0088FE", "#00C49F"];
//   const progressData = [
//     { name: "Progress", value: value1 },
//     { name: "Remaining", value: target - value1 },
//   ];

//   return (
//     <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
//       <Stack spacing={2}>
//         <ResponsiveContainer width="50%" height={400}>
//           <PieChart>
//             <Pie
//               data={progressData}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {progressData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={colors2[index]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//         <Button
//           size="sm"
//           variant="outlined"
//           color="neutral"
//           onClick={handleButtonClick}
//         >
//           {buttonLabel}
//         </Button>
//       </Stack>
//       <Stack spacing={2}>
//         <CircularProgress size="lg" determinate value={value2 as number} />
//         <Typography>{value2}%</Typography>
//       </Stack>
//       <Button size="sm" variant="outlined" color="neutral" onClick={reset}>
//         Reload
//       </Button>
//     </Stack>
//   );
// }
