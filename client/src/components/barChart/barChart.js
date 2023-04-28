import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'primereact/chart';
import Moment from 'moment';

export default function BarChart() {
    const getdata = useSelector((state) => state.invoice.Invoices)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: FilterYears(),
            datasets: [
                {
                    label: 'Invoices',
                    data: FilterInvoices(),
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);


    
    const FilterYears = () => {
        var years = [];
        if (getdata) {
            for (let i = 0; i < getdata.length; i++) {
                years.push(Moment(getdata[i].created).format('L'));
            }
        }
        return years;
    }

  const FilterInvoices = () => {
    var invoices = [];
    if(getdata){
        for (let i = 0; i < getdata.length; i++) {
            invoices.push( getdata[i].amount);
    
          }
    }

      return invoices; 
  }



    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        