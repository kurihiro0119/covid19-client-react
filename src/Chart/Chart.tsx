import React from "react";
import styles from "./Chart.module.css";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectDailyData, selectLastDay } from "../covidSlice";


const Chart: React.FC = () => {
    const dailyData = useSelector(selectDailyData);
    const lastDay = useSelector(selectLastDay);
    const data={
            labels: dailyData.map((value) => value.reportDate),
            datasets: [
              {
                data: dailyData.map((value) => value.confirmed),
                label: "Infected",
                backgroundColor:"rgba(75,192,192,0.2)",
                borderColor: "#3333ff",
                fill: true,
              },
            ],
          };

    return (
        <div className={styles.container}>
            <Line data={data} />
        </div>
    );
};

export default Chart;