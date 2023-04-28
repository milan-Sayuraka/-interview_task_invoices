import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'primereact/chart';
import Moment from 'moment';

export default function PieChart(props) {
    const getdata = useSelector((state) => state.invoice.Invoices)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: labels(),
            datasets: [
                {
                    data: [invoicesByDay() || 0],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [getdata, props]);

    const labels = () => {
        if (props.date) {
            return [Moment(props.date).format("MMM Do YY")]
        } else {
            return [Moment(new Date()).format("MMM Do YY")]
        }
    }

    const invoicesByDay = () => {
        let listByDay = [];
        if (getdata) {
            listByDay = getdata.filter((item) => {
                const invoices = Moment(item.created).format('L');
                return invoices < Moment(props.date).format('L') || Moment(new Date()).format('L');
            });
        }
        return listByDay.length;
    }


    return (
        <div className="card flex justify-content-center">

            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
