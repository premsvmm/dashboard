import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import { Bar, Line } from "react-chartjs-2";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import React from "react";
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
      borderColor: 'rgb(60, 179, 113)',
      backgroundColor: 'rgba(60, 179, 113, 0.5)',
      borderWidth: 2,
      data: [133, 99, 161, 141, 91]
    }
  ]
}

const barstate = {
  labels: ['PR#1', 'PR#2', 'PR#3',
    'PR#4', 'PR#5'],

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
    }
  ]
}
function charts(){

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
                <div className="row">
        <div style={{marginTop:50}} className="col-md-6">
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
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
                      text:'Average Rainfall per month',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }} data={barstate} />
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

      </DashboardLayout>
    </>
  )

}
export default charts;