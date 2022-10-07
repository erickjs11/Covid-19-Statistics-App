import React from 'react'
import {Bar} from 'react-chartjs-2';
import { Box, Typography, Card, CardContent } from "@mui/material/";

const getData = ({ labels, data, colors, label}) => ({
    labels,
    datasets: [
      {
        label,
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

const BarChart = ({ labels, data, colors, title, label}) => {
  return (
    <Card sx={{ Height: "500px", maxWidth: "500px", m: "auto", boxShadow: 'none'}}>
    <CardContent sx={{p: '15px', background: '#f1f1f1'}}>
      <Box
        sx={{
          height: "300px",
          width: "350px",
          m: 'auto',
          pb: '15px',
        }}
      >
        <Bar
          data={getData({ labels, data, colors, label})}
          label={label}
          options={options}
          width={"80"}
        />
        <Typography sx={{background: '#393D47', mt: '5px', borderRadius: '10px'}}variant="h6" color={'#f1f1f1'}  letterSpacing={2}>{title}</Typography>
      </Box>
    </CardContent>
  </Card>
  )
}

export default BarChart