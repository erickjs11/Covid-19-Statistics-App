import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider, TextField, Grid } from "@mui/material/";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {
  useFrom,
  useHistoric,
  useMaxDate,
  useMinDate,
  useTo,
} from "../../Services/redux/reducers/states";
import DoughnutChart from "../Charts/DoughnutChart";
import {
  formatDate,
  getDateRange,
  getPostByDate,
  parseDate,
} from "../../Utils";
import LineChart from "../Charts/LineChart";
import RadarChart from "../Charts/RadarChart";

const baseURL = "https://api.covidtracking.com/v1/us/daily.json";

const Historic = () => {
  const [historic, setHistoric] = useHistoric();
  const [from, setFrom] = useFrom();
  const [to, setTo] = useTo();
  const [maxDate, setMaxDate] = useMaxDate();
  const [minDate, setMinDate] = useMinDate();

  useEffect(() => {
    if (!historic) {
      axios.get(baseURL).then((response) => {
        const { data } = response;
        const first = data[0];
        const last = data[data.length - 1];

        const firstDate = formatDate(parseDate(first.date));
        const lastDate = formatDate(parseDate(last.date));

        setHistoric(data);
        setTo(firstDate);
        setFrom(lastDate);
        setMaxDate(firstDate);
        setMinDate(lastDate);
      });
    }
  }, [historic, setHistoric, setTo, setFrom, setMinDate, setMaxDate]);

  if (!historic) return null;

  const dateRange = getDateRange(
    Number((from || "").replaceAll("-", "")),
    Number((to || "").replaceAll("-", "")),
    historic
  );

  const getDataSet = (post) => {
    if (!post) return [];
    console.log(post);
    const { death, positiveIncrease, negativeIncrease, hospitalizedCurrently
      , totalTestResultsIncrease } = post;
    return [death, positiveIncrease, negativeIncrease, hospitalizedCurrently
      , totalTestResultsIncrease];
  };

  const fromCompare = getPostByDate(from, historic);
  const toCompare = getPostByDate(to, historic);

  return (
    <Box
      sx={{
        marginTop: "60px", height: "100vh", overflowX: "hidden"
      }}
    >
      {/* Page header */}
        <Typography
          variant="h4"
          align="left"
          letterSpacing={2}
          fontWeight={"600"}
          sx={{ m: "25px" }}
        >
          Historic Covid-19 statistics
        </Typography>

      <Divider sx={{mb: '20px'}}/>

      {/* Date selector */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={6} >
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label={"From"}
              onChange={(event) => {
                const date = event.format("YYYY-MM-DD");
                setFrom(date);
              }}
              value={moment(from)}
              renderInput={(params) => <TextField {...params} />}
              minDate={moment(minDate)}
            ></DesktopDatePicker>
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label={"To"}
              onChange={(event) => {
                const date = event.format("YYYY-MM-DD");
                setTo(date);
              }}
              value={moment(to)}
              renderInput={(params) => <TextField {...params} />}
              maxDate={moment(maxDate)}
            ></DesktopDatePicker>
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Divider sx={{m: '20px'}}/>

      {/* Charts */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <RadarChart
            labels={["Death", "Positive", "Negative", "Hospitalized", "Total"]}
            firstData={getDataSet(fromCompare)}
            firstLabel={from}
            secondData={getDataSet(toCompare)}
            secondLabel={to}
            title={'Cases'}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{mb: '60px'}}>
          <LineChart
            data={dateRange.map((post) => post.deathIncrease)}
            title={"Total Deaths"}
            label={"Deaths Chart"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Historic;
