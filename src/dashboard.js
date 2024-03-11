import React, { useEffect, useState } from 'react';
import BarScreen from "./barChart";
import SplitBarChart from "./splitBarChart";
import Squares from "./squares";

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % 4);
        }, 15000);

        return () => clearInterval(interval);
    }, [currentPage]);

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return <BarScreen />;
            case 1:
                return <SplitBarChart />;
            case 2:
                return <Squares />;
            default:
                return <BarScreen />;
        }
    };

    return renderPage()
}