import { Table } from "@mantine/core";
import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import DashboardHospital from "../dashboard/ProductDashboard";
import { BackgroundImage } from "@mantine/core";
import Axios from "axios";
const currrentURL = window.location.href;
function Dashboard() {
  const [value, setValue] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detail1, setDetail1] = useState(false);

  useEffect(() => {
    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };

    Axios.get(`${import.meta.env.VITE_API}/api/products/getAll`, config).then(
      (response) => {
        // console.log(response.data.data.data.userId.firstName);
        setValue(response.data);
        console.log(response);
        // window.location.reload(false);
      }
    );
  });
  const rows = value.map((val) => (
    <tr key={val.id}>
      <td>{val.name}</td>
      <td>{val.status}</td>
      <td>{val.amount}</td>
    </tr>
  ));
  return (
    <BackgroundImage src="/background.png">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Dashboard actions */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Avatars */}
                {/* <DashboardAvatars /> */}

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Filter button */}
                  {/* <FilterButton /> */}
                  {/* Datepicker built with flatpickr */}

                  <Datepicker />
                  {/* Add view button */}
                  <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Set Date </span>
                  </button>
                </div>
              </div>

              {/* Cards */}

              <div>
                {/* Line chart (Acme Plus) */}
                {detail1 === false && (
                  <div className="grid grid-cols-12 gap-6">
                    <DashboardCard01 set={setDetail1} />

                    {/* Line chart (Acme Advanced) */}
                    <DashboardCard02 set={setDetail1} />
                    {/* Line chart (Acme Professional) */}
                    <DashboardCard03 set={setDetail1} />
                    {/* Bar chart (Direct vs Indirect) */}
                    <DashboardCard04 set={setDetail1} />
                    {/* Line chart (Real Time Value) */}
                    <DashboardCard05 set={setDetail1} />
                    {/* Doughnut chart (Top Countries) */}
                    <DashboardCard06 set={setDetail1} />
                    {/* Table (Top Channels) */}
                    <DashboardCard07 set={setDetail1} />
                  </div>
                )}

                {detail1 === true && (
                  <div>
                    <button onClick={() => setDetail1(false)}>Back</button>
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>{rows}</tbody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* <Banner /> */}
        </div>
      </div>
    </BackgroundImage>
  );
}

export default Dashboard;
