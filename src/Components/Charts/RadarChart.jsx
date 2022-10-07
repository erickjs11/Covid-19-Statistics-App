import React from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Box, Typography, Card, CardContent } from "@mui/material/";

const getData = ({
  labels,
  firstData,
  secondData,
  firstLabel,
  secondLabel,
}) => ({
  labels,
  datasets: [
    {
      label: firstLabel,
      data: firstData,
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: secondLabel,
      data: secondData,
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
});

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

const RadarChart = ({
  labels,
  firstData,
  secondData,
  firstLabel,
  secondLabel,
  title,
}) => {
  return (
    <Card sx={{ Height: "500px", maxWidth: "500px", m: "auto", boxShadow: 'none' }}>
      <CardContent sx={{ p: '15px', background: '#f1f1f1' }}>
        <Box
          sx={{
            height: "300px",
            width: "350px",
            m: 'auto',
            pb: '15px',
          }}
        >
          <Radar
            data={getData({
              labels,
              firstData,
              secondData,
              firstLabel,
              secondLabel,
            })}
            label={title}
            options={options}
            width={"80"}
          />
          <Typography
            sx={{ background: "#393D47", mt: "5px", borderRadius: "10px" }}
            variant="h6"
            color={"#f1f1f1"}
            letterSpacing={2}
          >
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RadarChart;
