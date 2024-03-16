import React, { useEffect, useState } from 'react';
import BarScreen from "./barChart";
import SplitBarChart from "./splitBarChart";
import Squares from "./squares";

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % 4);
        }, 60000);

        return () => clearInterval(interval);
    }, [currentPage]);

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return <Squares />;
            case 1:
                return <BarScreen />;  
            case 2:
                return <SplitBarChart />;
            default:
                return <Squares />;
        }
    };

    return renderPage()
}