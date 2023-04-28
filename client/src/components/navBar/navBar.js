
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const NavBar = () => {
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-chart-bar',
            url: '/'
        },
        {
            label: 'Invoices',
            icon: 'pi pi-fw pi-book',
            url: '/invoices'
        }
    ];

    const start = <img alt="logo" src="https://invoice-gen.com/assets/images/logo_f.png"  height="40" className="mr-2"></img>;
    // const end = <InputText placeholder="Search" type="text" />;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start}  />
            </div>
        </div>
    );
}
                 
export default NavBar;