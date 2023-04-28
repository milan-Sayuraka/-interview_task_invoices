import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'primereact/chart';
import Moment from 'moment';

export default function LineChart() {
    const getdata = useSelector((state) => state.invoice.Invoices)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels:  last5Months().slice(1,last5Months().length),
            datasets: [
                {
                    label: 'Invoice Data',
                    data: filterDataByMonths(),
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },

            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [getdata]);

    const last5Months = () =>{
        var arr = new Array();

        arr.push(Moment().format());
      
        for(var i=1; i< 6; i++){
          arr.push(Moment().add(i*-1, 'Month').format('MMMM'));
        }
      return arr;

    }

    const filterDataByMonths = () => {
        const today = new Date();
        const fiveMonthsAgo = new Date(today.setMonth(today.getMonth() - 5));
    
        let results = [];
        if (getdata) {
            results = getdata.filter(item => {
                const createdDate = new Date(item.created);
                return createdDate >= fiveMonthsAgo;
            });
        }
    
        let filteredUsers = [];
        for (let i = 0; i < results.length; i++) {
            if (Moment(fiveMonthsAgo).format('MMMM Do YYYY, h:mm:ss a') > Moment(results[i].created).format('MMMM Do YYYY, h:mm:ss a')) {
                filteredUsers.push(results[i].amount)
            }
        }
        return filteredUsers
    }

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        