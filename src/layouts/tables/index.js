/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { tooltipClasses } from "@mui/material";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();


  const [prdetails, setPrdetails] = useState([])
  const [unittest, setunitDetails] = useState({
    "commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''
  })
  const [e2etest, sete2eTestDetails] = useState({
    "commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''
  })
  const [integrationcoverage, setintegrationcoverage] = useState({
    "commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/pr`)
      .then((resp) => {
        console.log("resp", resp);
        const data = resp.data;
        console.log("datajson", data)
        setPrdetails(data)
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const checkCommitId = (e) => {
    handleOpen()
    console.log(e)
    const selectedcommitId = e.commit_id;
    console.log("selectedcommitId", selectedcommitId)
    axios
      .get(`https://2607-115-110-224-178.ngrok-free.app/v1/metrics?commit_id=` + selectedcommitId)
      .then((resp) => {
        console.log("resp", resp);
        const data = resp.data;

        console.log("data", data);

        const unittest = data.unit_test
        const e2etest = data.e2e_test
        const integrationcoverage = data.integration_test

        setunitDetails({
          "commit_id": unittest.commit_id,
          "pass": unittest.pass,
          "failed": unittest.failed,
          "skipped": unittest.skipped,
          "overall_coverage": unittest.overall_coverage,
          "modified_coverage": unittest.modified_coverage
        });
        sete2eTestDetails({
          "commit_id": e2etest.commit_id,
          "pass": e2etest.pass,
          "failed": e2etest.failed,
          "skipped": e2etest.skipped,
          "overall_coverage": e2etest.overall_coverage,
          "modified_coverage": e2etest.modified_coverage
        });

        setintegrationcoverage({
          "commit_id": integrationcoverage.commit_id,
          "pass": integrationcoverage.pass,
          "failed": integrationcoverage.failed,
          "skipped": integrationcoverage.skipped,
          "overall_coverage": integrationcoverage.overall_coverage,
          "modified_coverage": integrationcoverage.modified_coverage
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 520,
      fontSize: theme.typography.pxToRem(11),
      border: '1px solid #dadde9',
    },
  }));


  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  PR details
                </MDTypography>
              </MDBox>
              <div style={{marginTop:30}} className="col-md-12">
                <table className="table table-hover">
                  <thead>
                  <tr style={{ fontSize: 14 }}>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">Service
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">PR No.
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">Branch
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">Commit Id
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">New Lines
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">Deleted Lines
                    </th>
                    <th style={{
                      background: "#49a3f1",
                      color: "white"
                    }} scope="col">Quality Gate Status
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {prdetails.map((list, index) => {
                    return (
                      <tr style={{ fontSize: 14 }} key={index}>
                        <td>{list.service}</td>
                        <td>{list.pr_num}</td>
                        <td>{list.branch}</td>
                        <td onClick={() => checkCommitId(list)}>{list.commit_id}</td>
                        <td>{list.deleted_lines}</td>
                        <td>{list.new_lines}</td>
                        <td>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                {list.notes}
                              </React.Fragment>
                            }
                          >
                            <Button>{list.github_status}</Button>
                          </HtmlTooltip></td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
