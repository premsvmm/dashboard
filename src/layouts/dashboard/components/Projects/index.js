

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


// Data
import data from "layouts/dashboard/components/Projects/data";
import { FormControl, InputLabel, Modal, Paper, Select, TableCell, TableHead, tooltipClasses } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
  const [prdetails, setPrdetails] = useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedservice, setselectservice] = useState({
    "id": '',
    "integration_threshold": 0,
    "service": '',
    "unit_threshold": 0
  })
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


//first API Parsed
  useEffect(() => {
    axios
      .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/services`)
      .then((resp) => {
        console.log("resp", resp);
        const data = resp.data;
        console.log("datajson", data)
        setMenu(data)
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);


//Select Service Function
  const selectoption = (e) => {
    console.log(e)
    const getobject = e.target.value;
    for (let menudata of menu) {
      if (menudata.id == getobject) {
        console.log(menudata)
        setselectservice({
          "id": menudata.id,
          "integration_threshold": menudata.integration_threshold,
          "service": menudata.service,
          "unit_threshold": menudata.unit_threshold
        })
      }
    }
    const selectedService = getobject
      console.log("selected", selectedService)
      axios
        .get(`https://c1a7-2405-201-d01a-18af-5458-bba5-a957-9f8a.ngrok-free.app/v1/pr?service_id=` + selectedService)
        .then((resp) => {
          console.log("resp", resp);
          const data = resp.data;
          console.log("data", data);
          setPrdetails(data)
        })
        .catch(function(error) {
          console.log(error);
        });
    }


    const checkCommitId = (e) => {
      handleOpen()
      console.log(e)
      const selectedcommitId = e.commit_id;
      console.log("selectedcommitId", selectedcommitId)
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
        .catch(function(error) {
          console.log(error);
        });
    }

    const setselectedservice = (item) => {
      console.log("item", item)
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

            <div className="col-md-4">
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


            <div className="col-md-12">
              <table className="table table-hover">
                <thead>
                <tr style={{ fontSize: 14 }}>
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
                      <th scope="row">{list.pr_num}</th>
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

          </MDBox>

          <MDBox>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >

              <Box sx={style}>
                <div className="row">
                  <div className="col-md-9">
                    <p style={{ fontSize: 14 }}>
                      {unittest.commit_id =="" ? <><p>Process is pending</p></> : null}
                      {unittest.commit_id !=="" ? <><p>Commit Id : {unittest.commit_id}</p></> : null}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <p className="btn btn-danger" onClick={handleClose} style={{color:"white",height:20,float:"right",padding:6, paddingTop:0}}>X</p>
                  </div>

                </div>
                <div className="col-md-12">
                  <table className="table table-hover">
                    <thead>
                    <tr style={{ fontSize: 14 }}>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Test Type
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Pass
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Failed
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Skipped
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Overall Coverage
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Modified Coverage
                      </th>
                      <th style={{
                        background: "#49a3f1",
                        color: "white"
                      }} scope="col">Quality Gate
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{ fontSize: 14 }}>
                      <td scope="row">Unit Test</td>
                      <td>{unittest.pass}</td>
                      <td>{unittest.failed}</td>
                      <td>{unittest.skipped}</td>
                      <td>{unittest.overall_coverage}</td>
                      <td>{unittest.modified_coverage}</td>
                      <td>{unittest.modified_coverage <= selectedservice.unit_threshold || unittest.overall_coverage <= selectedservice.unit_threshold ? "Failed" : "Pass"}</td>
                    </tr>
                    <tr style={{ fontSize: 14 }}>
                      <td scope="row">E2E Test</td>
                      <td>{e2etest.pass}</td>
                      <td>{e2etest.failed}</td>
                      <td>{e2etest.skipped}</td>
                      <td>{e2etest.overall_coverage}</td>
                      <td>{e2etest.modified_coverage}</td>
                      <td>{e2etest.modified_coverage <= selectedservice.integration_threshold || e2etest.overall_coverage <= selectedservice.integration_threshold ? "Failed" : "Pass"}</td>
                    </tr>
                    <tr style={{ fontSize: 14 }}>
                      <td scope="row">Integration Coverage Test</td>
                      <td>{integrationcoverage.pass}</td>
                      <td>{integrationcoverage.failed}</td>
                      <td>{integrationcoverage.skipped}</td>
                      <td>{integrationcoverage.overall_coverage}</td>
                      <td>{integrationcoverage.modified_coverage}</td>
                      <td>{integrationcoverage.modified_coverage <= selectedservice.integration_threshold || integrationcoverage.overall_coverage <= selectedservice.integration_threshold ? "Failed" : "Pass"}</td>
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
