import Chart from "../../components/Charts/page";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import React from "react";

export const metadata = {
  title: "Fee Management System",
  description:
    "This is school fee submitation website",
};

const BasicChartPage = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
