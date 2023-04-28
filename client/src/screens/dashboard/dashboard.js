import React, { useState } from 'react';
import { Card } from 'primereact/card';
import BarChart from "../../components/barChart/barChart"
import PieChart from "../../components/pieChart/pieChart"
import LineChart from '../../components/lineChart/lineChart';
import { Calendar } from 'primereact/calendar';

const Dashboard = () => {
    const [date, setDate] = useState(null);

    return (
        <div>
            <div className="card">
                <div className="grid p-fluid">
                    <div className="field col-12 md:col">
                        <Card title="Invoice Trends by last 5 months" >
                            <LineChart />
                        </Card>
                    </div>
                </div>
                <div className="grid p-fluid">
                    <div className="field col-12 md:col">
                        <Card title="Invoices" >
                            <BarChart />
                        </Card>
                    </div>
                    <div className="field col-12 md:col">
                        <Card title="Number of invoices filter by day" >
                            <div className="field col">
                                <Calendar id="icon" value={date} onChange={(e) => setDate(e.value)} showIcon />
                            </div>
                            <div >
                                <PieChart date={date} />
                            </div>

                        </Card>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;