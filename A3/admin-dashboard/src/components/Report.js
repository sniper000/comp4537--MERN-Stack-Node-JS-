import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportGraph from "./ReportGraph";

function Report({ id }) {
  console.log(id);
  return (
    <>
      <h1>Report {id}</h1>
      <ReportGraph report={id} />
    </>
  );
}

export default Report;
