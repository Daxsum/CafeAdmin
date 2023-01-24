import React, { useState } from "react";

import Sidebar from "../../hospitalFile/Sidebar";
import Header from "../../hospitalFile/Header";
import WelcomeBanner from "../../hospitalFile/dashboard/WelcomeBanner";
import FilterButton from "../../hospitalFile/actions/FilterButton";
import Datepicker from "../../hospitalFile/actions/Datepicker";
import Banner from "../../hospitalFile/Banner";
import Hospital from ".";
import { BackgroundImage } from "@mantine/core";

function DashboardHospital() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BackgroundImage src='./background.png' radius='sm'>
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

                {/* <Datepicker /> */}
                {/* Add view button */}
              </div>
            </div>

            {/* Cards */}

            <div className="grid  gap-6">
              <Hospital />
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
    </BackgroundImage>
  );
}

export default DashboardHospital;
