import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import styled from "@mui/material/styles/styled";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { states } from "../../Shared";
import {
  assignCurrent,
  useCurrent,
} from "../../Services/redux/reducers/states";
import DoughnutChart from "../Charts/DoughnutChart";
import BarChart from "../Charts/BarChart";
import { formatDate, parseDate } from "../../Utils";

const baseURL = "https://api.covidtracking.com/v1/us/current.json";

const Current = () => {
  const [post, setPost] = useState(null);
  const [current, setCurrent] = useCurrent();

  useEffect(() => {
    if (current === "USA") {
      axios.get(baseURL).then((response) => {
        setPost(response.data[0]);
      });
    } else {
      axios
        .get(
          `https://api.covidtracking.com/v1/states/${current.toLowerCase()}/current.json`
        )
        .then((response) => {
          setPost(response.data);
        });
    }
  }, [current]);

  if (!post) return null;

  console.log(post);

  const date = parseDate(post.date);

  return (
    <Box sx={{ marginTop: "60px", height: "100vh", overflowX: "hidden" }}>
      {/* Page header */}
      <Box sx={{ pl: "25px" }}>
        <Typography
          variant="h4"
          align="left"
          letterSpacing={2}
          fontWeight={"600"}
          sx={{ pt: "25px" }}
        >
          Current Covid-19 statistics
        </Typography>
        <Typography variant="h5" align="left" sx={{ padding: "10px 0 20px 0" }}>
          {formatDate(date, " / ")}
        </Typography>
      </Box>

      <Divider />

      {/* Page Content */}
      <Box
        sx={{
          p: "35px 0 35px 0",
          background: "#393D47",
          color: "#f1f1f1",
        }}
      >
        <Typography variant="h4" fontWeight={"700"} letterSpacing={2}>
          {`New Cases${post.state ? `: ${post.state}` : ""}`}
        </Typography>
        <Typography variant="h5" fontWeight={"600"} letterSpacing={3}>
          {post.positiveIncrease}
        </Typography>
      </Box>

      {/* State selector */}
      <FormControl variant="standard" sx={{ m: "25px auto", minWidth: 120 }}>
        <InputLabel>Select State</InputLabel>
        <Select
          value={current}
          defaultValue={""}
          onChange={(event) => {
            setCurrent(event.target.value);
          }}
          label="Age"
        >
          <MenuItem key={`USA`} value={"USA"}>
            {"USA"}
          </MenuItem>
          {states.map((stateItem, index) => {
            return (
              <MenuItem key={`${index}-state`} value={stateItem}>
                {stateItem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

        {/* Charts */}
      <Grid container spacing={6} sx={{ mb: "60px" }}>
        <Grid item xs={12} md={6}>
          <DoughnutChart
            labels={["Positive", "Negative"]}
            data={[post.positiveIncrease, post.negativeIncrease]}
            colors={["#EF476F", "#06D6A0"]}
            title={"Daily Cases"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart
            labels={["On Ventilator", "In ICU"]}
            data={[post.onVentilatorCurrently, post.inIcuCurrently]}
            colors={["#EF476F", "#06D6A0"]}
            title={"Hospitalized"}
            label={`Currently ${post.hospitalizedCurrently}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Current;
