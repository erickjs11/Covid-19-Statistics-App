import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const STATE = {
  CURRENT: "current",
  HISTORIC: "historic",
  FROM: "from",
  TO: "to",
  MAX_DATE: "max_date",
  MIN_DATE: "min_date",
};

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    [STATE.CURRENT]: "USA",
    [STATE.HISTORIC]: undefined,
    [STATE.FROM]: undefined,
    [STATE.TO]: undefined,
    [STATE.MAX_DATE]: undefined,
    [STATE.MIN_DATE]: undefined,
  },
  reducers: {
    assignValue: (state, action) => {
      const { payload } = action;
      const { name, value } = payload;
      state[name] = value;
    },
  },
});

const { assignValue } = stateSlice.actions;

const useGenericStateHook = (name) => {
  useEffect(() => {}, []);
  const data = useSelector((state) => state.state[name]);
  const dispatch = useDispatch();

  const setValue = (value) => {
    dispatch(assignValue({ name, value }));
  };

  return [data, setValue];
};

export const useCurrent = () => useGenericStateHook(STATE.CURRENT);
export const useHistoric = () => useGenericStateHook(STATE.HISTORIC);
export const useFrom = () => useGenericStateHook(STATE.FROM);
export const useTo = () => useGenericStateHook(STATE.TO);
export const useMaxDate = () => useGenericStateHook(STATE.MAX_DATE);
export const useMinDate = () => useGenericStateHook(STATE.MIN_DATE);

export default stateSlice.reducer;
