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

import React,{ useState,useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios"

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { FormControl, InputLabel, Modal, Paper, Select, TableCell, TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState([]);
  const [prdetails,setPrdetails] = useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/services`)
      .then((resp) => {
        console.log("resp", resp);
        const data = resp.data;
        console.log("datajson",data)
        setMenu(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const selectoption =(e)=>{
    console.log(e)

const selectedService = e.target.value;
    console.log("selected",selectedService)
    axios
      .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/pr?service_id=` + selectedService)
      .then((resp) => {
        console.log("resp", resp);
        const data = resp.data;
        console.log("data", data);
        setPrdetails(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [unittest,setunitDetails] = useState({"commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''
    })
  const [e2etest,sete2eTestDetails] = useState({"commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''})
  const [integrationcoverage,setintegrationcoverage] = useState({"commit_id": '',
    "failed": '',
    "overall_coverage": '',
    "modified_coverage": '',
    "pass": '',
    "skipped": ''})
  const checkCommitId =(e)=>{
    handleOpen()
    console.log(e)
    const selectedcommitId = e.commit_id;
    console.log("selectedcommitId",selectedcommitId)
    axios
      .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/metrics?commit_id=` + selectedcommitId)
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
      .catch(function (error) {
        console.log(error);
      });
  }


  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  const [age, setAge] = React.useState('10');
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
<>
    <Card>
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
                  Service Details
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>

        <div className="col-md-4" >
        <select
          name="service"
          className="form-control col-md-3"
          value={menu.service}
          onChange={(e) => selectoption(e)}
          placeholder="Service name"

        >
          <option name="" value="" style={{ display: "none" }}>Service Name</option>
          {menu.map((element) => {
            return (
              <>
                <option
                  name={element.id}
                  value={element.id}
                >
                  {element.service}
                </option>
              </>
            );
          })}
        </select>
        </div>
      </MDBox>
      <MDBox>
        {/*<DataTable*/}
        {/*  table={{ columns, rows }}*/}
        {/*  showTotalEntries={false}*/}
        {/*  isSorted={false}*/}
        {/*  noEndBorder*/}
        {/*  entriesPerPage={false}*/}
        {/*/>*/}
<div className="col-md-12">
        <table className="table table-hover">
          <thead>
          <tr style={{fontSize:14}}>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">PR No.</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">Branch</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">Commit Id</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">New Lines</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">Deleted Lines</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">Quality Gate Status</th>
            <th style={{background: "#49a3f1",
              color: "white"}} scope="col">notes</th>
            {/*<th scope="col">Service Id</th>*/}
            {/*<th scope="col">Updated At</th>*/}
            {/*<th scope="col">Created At</th>*/}
          </tr>
          </thead>
          <tbody>
          {prdetails.map((list, index) => {
            return(
          <tr  style={{fontSize:14}} key={index}>
            <th scope="row">{list.pr_num}</th>
            <td>{list.branch}</td>
            <td onClick={()=>checkCommitId(list)}>{list.commit_id}</td>
            <td>{list.deleted_lines}</td>
            <td>{list.new_lines}</td>
            <td>{list.github_status}</td>
            <td>{list.notes}</td>
            {/*<td>{list.service_id}</td>*/}
            {/*<td>{list.updated_at}</td>*/}
            {/*<td>{list.created_at}</td>*/}
          </tr>
              )})}
          </tbody>
        </table>
</div>

      </MDBox>

      <MDBox>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <div><p style={{fontSize:14}} >Commit Id : {unittest.commit_id}</p></div>
            <div className="col-md-12">
              <table className="table table-hover">
                <thead>
                <tr style={{fontSize:14}}>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Test Type</th>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Pass</th>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Failed</th>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Skipped</th>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Overall Coverage</th>
                  <th style={{background: "#49a3f1",
                    color: "white"}} scope="col">Modified Coverage</th>
                </tr>
                </thead>
                <tbody>
                <tr style={{fontSize:14}}>
                  <td scope="row">Unit Test</td>
                  <td>{unittest.pass}</td>
                  <td>{unittest.failed}</td>
                  <td>{unittest.skipped}</td>
                  <td>{unittest.overall_coverage}</td>
                  <td>{unittest.modified_coverage}</td>
                </tr>
                <tr style={{fontSize:14}}>
                  <td scope="row">E2E Test</td>
                  <td>{e2etest.pass}</td>
                  <td>{e2etest.failed}</td>
                  <td>{e2etest.skipped}</td>
                  <td>{e2etest.overall_coverage}</td>
                  <td>{e2etest.modified_coverage}</td>
                </tr>
                <tr style={{fontSize:14}}>
                  <td scope="row">Integration Coverage Test</td>
                  <td>{integrationcoverage.pass}</td>
                  <td>{integrationcoverage.failed}</td>
                  <td>{integrationcoverage.skipped}</td>
                  <td>{integrationcoverage.overall_coverage}</td>
                  <td>{integrationcoverage.modified_coverage}</td>
                </tr>

                </tbody>
              </table>
            </div>

          </Box>

        </Modal>
      </MDBox>
    </Card>
  </>
  );
}

export default Projects;
