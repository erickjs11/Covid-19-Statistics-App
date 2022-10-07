import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, Card, CardContent } from "@mui/material/";

const getData = ({ labels, data, colors }) => ({
  labels,
  datasets: [
    {
      data,
      borderColor: ["#f1f1f1"],
      backgroundColor: colors,
    },
  ],
});

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

const DoughnutChart = ({ labels, data, colors, title = "Doughnut Chart" }) => {
  return (
    <Card
      sx={{
        maxWidth: "500px",
        boxShadow: "none",
        margin: "auto",
      }}
    >
      <CardContent sx={{ background: "#f1f1f1" }}>
        <Box
          sx={{
            height: "300px",
            width: "300px",
            m: "auto",
            pb: "15px",
          }}
        >
          <Doughnut
            data={getData({ labels, data, colors })}
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

export default DoughnutChart;
