import React, { useEffect, useState } from 'react'
import { GiDiploma } from "react-icons/gi"
import { PiStudentDuotone } from "react-icons/pi"
import { useStudentContext } from '../../../contexts/StudentContext';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Hero() {

    const { getTotalStudents, getTotalCourses } = useStudentContext()
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    // const [totalMessages, setTotalMessages] = useState(0);

    useEffect(() => {
        getTotalStudents().then((count) => {
            setTotalStudents(count);
        });
        getTotalCourses().then((count) => {
            setTotalCourses(count);
        });

    }, []);


    const total = totalStudents + totalCourses;
    const studentPercentage = ((totalStudents / total) * 100).toFixed(2);
    const coursesPercentage = ((totalCourses / total) * 100).toFixed(2);


    // Inside your component...
    useEffect(() => {
        // Create a reference to the canvas element
        const canvas = document.getElementById('myChart');

        // Check if the canvas element exists before attempting to create the chart
        if (canvas) {
            const ctx = canvas.getContext('2d');

            // Replace the following with your actual chart configuration
            const chartConfig = {
                type: 'bar',
                data: {
                    labels: ['Label 1', 'Label 2'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [10, 20],
                        },
                    ],
                },

            };

            // Create and render the chart
            const myChart = new Chart(ctx, chartConfig);

            // Cleanup on unmount (destroy the chart instance)
            return () => {
                myChart.destroy();
            };
        }
    }, []);


    const chartData = {
        labels: ['Total Students', 'Total Courses'],
        datasets: [
            {
                data: [studentPercentage, coursesPercentage],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    const chartOptions = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = ((currentValue / total) * 100).toFixed(2);
                    return `${data.labels[tooltipItem.index]}: ${percentage}%`;
                },
            },
        },
    };







    return (
        <section className='mt-5' id='dashboard' >
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className="card mb-2 mb-lg-0 dashboard-card1 text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl"  >
                                <div className="mb-3">
                                    <GiDiploma size={50} />
                                </div>
                                <h2>{totalCourses}</h2>
                                <p className="text-center">Total Courses</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card dashboard-card2 text-center">
                            <div className=" border-2 px-4 py-3 rounded-xl"  >
                                <div className="mb-3">
                                    <PiStudentDuotone size={50} />
                                </div>
                                <h2>{totalStudents}</h2>
                                <p className="text-center">Total Students</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container" style={{ width: "300px" }}>
                <div className="row">
                    <div className="col">
                        {/* Bar Chart */}
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </section>
    )
}
