import React,{ useState,useEffect } from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import { Bar, Line } from "react-chartjs-2";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";



const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],

  datasets: [
    {
      label: 'lines not covered',
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    },
    {
      label: 'lines covered',
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgb(60, 179, 113)',
      backgroundColor: 'rgba(60, 179, 113, 0.5)',
      borderWidth: 2,
      data: [68, 40, 81, 60, 35]
    },
    {
      label: 'overall lines added',
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgb(0, 150, 255)',
      backgroundColor: 'rgba(0, 150, 255, 0.5)',
      borderWidth: 2,
      data: [133, 99, 161, 141, 91]
    }
  ]
}

const barstate = {
  labels: ['PR#1800', 'PR#1801', 'PR#1802'],

  datasets: [

    {
      label: 'lines covered',
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgb(60, 179, 113)',
      backgroundColor: 'rgba(60, 179, 113, 0.5)',
      borderWidth: 2,
      data: [5, 0, 0]
    },{
      label: 'lines not covered',
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 2,
      data: [2, 7, 7]
    },
  ]
}


function charts(){


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [menu, setMenu] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showchart,setShowChart] = useState(false)

  const selectoption =()=>{
    setShowChart(true)
  }
  return(
    <>
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
                    Insights
                  </MDTypography>
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

                      <option name={1} value={1}>scrooge</option>
                    </select>
                  </div>
                </MDBox>

                {showchart===true ? <>


                <div className="row">
        <div style={{marginTop:50}} className="col-md-6">
          <Line
            data={state}
            options={{
              title:{
                display:true,
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>

                  <div style={{marginTop:50}}  className="col-md-6">
                  <Bar options={{
                    title:{
                      display:true,
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }} data={barstate} />
                  </div>
                </div>
                </> : null}
              </Card>
            </Grid>
          </Grid>
        </MDBox>

      </DashboardLayout>
    </>
  )

}
export default charts;