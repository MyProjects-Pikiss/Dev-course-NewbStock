import React, { useEffect, useRef } from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    LineController,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
} from 'chart.js';
import styles from './NewbieContent.module.css';

// Chart.js 스케일 및 플러그인, 요소 등록
Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);

function NewbieContent({ selectedDate, type, data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data) return;

        let labels, datasets, yAxes = [];

        if (type === "stocktop3") {
            labels = data.yearly_open_values.map(item => item.date);
            datasets = [{
                label: data.name,
                data: data.yearly_open_values.map(item => parseFloat(item.open_value)),
                borderColor: getRandomColor(),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                yAxisID: 'y-axis-1'
            }];
            yAxes = [{ id: 'y-axis-1', position: 'left' }];
        } else if (type === "biweekly") {
            labels = data.dates;
            datasets = [
                {
                    label: 'KOSPI',
                    data: data.kospi,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-kospi'
                },
                {
                    label: 'KOSDAQ',
                    data: data.kosdaq,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-kosdaq'
                }
            ];
            yAxes = [
                { id: 'y-axis-kospi', position: 'left', ticks: { beginAtZero: false } },
                { id: 'y-axis-kosdaq', position: 'right', ticks: { beginAtZero: false } }
            ];
        } else if (type === "exchange_rate") {
            labels = data.dates;
            datasets = [
                {
                    label: '100엔',
                    data: data.yen_100,
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-yen'
                },
                {
                    label: '달러',
                    data: data.dollar,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-dollar'
                },
                {
                    label: '위안',
                    data: data.yuan,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-yuan'
                }
            ];
            yAxes = [
                { id: 'y-axis-yen', position: 'left', ticks: { beginAtZero: false } },
                { id: 'y-axis-dollar', position: 'right', ticks: { beginAtZero: false } },
                { id: 'y-axis-yuan', position: 'right', ticks: { beginAtZero: false, display: false } }
            ];
        } else if (type === "interest") {
            labels = data.dates;
            datasets = [
                {
                    label: '10년 국채',
                    data: data.treasury_10y,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-treasury-10y'
                },
                {
                    label: '2년 국채',
                    data: data.treasury_2y,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-treasury-2y'
                },
                {
                    label: 'KORIBOR 12개월',
                    data: data.koribor_12m,
                    borderColor: 'rgb(255, 206, 86)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    tension: 0.1,
                    yAxisID: 'y-axis-koribor'
                }
            ];
            yAxes = [
                { id: 'y-axis-treasury-10y', position: 'left', ticks: { beginAtZero: false } },
                { id: 'y-axis-treasury-2y', position: 'right', ticks: { beginAtZero: false } },
                { id: 'y-axis-koribor', position: 'right', ticks: { beginAtZero: false, display: false } }
            ];
        } else if (type === "news") {
            labels = data.dates;
            datasets = [{
                label: '뉴스 심리지수',
                data: data.sentiment,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                yAxisID: 'y-axis-news'
            }];
            yAxes = [{ id: 'y-axis-news', position: 'left', ticks: { beginAtZero: false } }];
        }

        const chart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
                scales: {
                    y: yAxes.reduce((acc, axis) => {
                        acc[axis.id] = axis;
                        return acc;
                    }, {})
                }
            },
        });

        return () => chart.destroy(); // Cleanup chart on unmount
    }, [data]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className={styles.chart_container}>
            <canvas ref={chartRef} className={styles.chart}></canvas>
        </div>
    );
}

export default NewbieContent;
