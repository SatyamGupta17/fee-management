"use client";
import dynamic from "next/dynamic";
import React from "react"; 
import TableOne from "../../components/Tables/TableOne";
import CardDataStats from "../../components/CardDataStats";
import DefaultLayout from '../../components/Layouts/DefaultLayout';

const MapOne = dynamic(() => import("../../components/Maps/MapOne"), {
  ssr: false, 
});

const ChartThree = dynamic(() => import("../../components/Charts/ChartThree"), {
  ssr: false, 
});


const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Tuition Fees" total="$3.456K" rate="0.43%" links = "/tuition-fees" levelUp />
        <CardDataStats title="Transportation Fees" total="$45,2K" rate="4.35%" links = "/transportation-fees" levelUp/>
        <CardDataStats title="SR Details" total="2.450" rate="2.59%" links = "/students-details" levelUp/> 
        <CardDataStats title="Total Expenditure" total="3.456" rate="0.95%"links = "/Expenditure" levelDown />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
      </DefaultLayout>
  );
};

export default  Dashboard;
