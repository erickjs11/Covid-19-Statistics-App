import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography, Card, CardContent } from "@mui/material/";

const getData = ({ labels, data, label }) => ({
  labels,
  datasets: [
    {
      label,
      data,
      borderColor: "rgb(75, 192, 192)",
      fill: false,
    },
  ],
});

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

const LineChart = ({ data, title, label }) => {
  return (
    <Card
      sx={{ Height: "500px", maxWidth: "500px", m: "auto", boxShadow: 'none'}}
    >
      <CardContent sx={{ background: "#f1f1f1", p: '15px' }}>
        <Box
          sx={{
            height: "300px",
            width: "350px",
            m: 'auto',
            pb: '15px',
          }}
        >
          <Line
            data={getData({ labels: data.map(() => ""), data, label })}
            label={label}
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

export default LineChart;
