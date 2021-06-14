import React, { useEffect } from "react";
import { configureStore, ThunkAction, Action, createAction } from '@reduxjs/toolkit';
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import { RootState } from "./app/store";
import { RSA_X931_PADDING } from "constants";
import { access } from "fs";

const apiUrl = "http://127.0.0.1:8000";


type DailyData = {
  reportDate: string,
  confirmed: number;
  deaths: number;
  recoverd: number;
};

type CovidState = {
  dailyData: DailyData[];
  lastUpdate: string;
  today: Date;
  todayConfirmed: number;
  tomorrowPredictConfirmed: number;
};

function getTodayString():string {
  const today:Date = new Date()
  const todayString:string = today.toDateString();
  return todayString;
}

const initialState: CovidState = {
  dailyData: [],
  today: new Date(),
  lastUpdate: getTodayString(),
  todayConfirmed: 0,
  tomorrowPredictConfirmed: 0,
}

export const fetchAsyncGetPastData = createAsyncThunk("/covid/get", async() =>{
  const { data } = await axios.get<DailyData[]>(`${apiUrl}/covid/get`);
  return data;
});

export const fetchAsyncGetPredictData = createAsyncThunk("/predict/get", async() =>{
  const { data } = await axios.get<number>(`${apiUrl}/predict/get`);
  console.log(data);
  return data;
});

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {
    updateDateReducer: (state) => {
      console.log("dispatch");
      state.lastUpdate = state.today.toDateString();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPastData.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
        todayConfirmed: action.payload[action.payload.length -1]["confirmed"],
      };
    });
    builder.addCase(fetchAsyncGetPredictData.fulfilled, (state, action) => {
      return {
        ...state,
        tomorrowPredictConfirmed: action.payload,
      };
    });
  },
});

export const selecttoday = (state: RootState) => state.covid.today;
export const selecttodayConfirmed = (state: RootState) => state.covid.todayConfirmed;
export const selecttomorrowPredictConfirmed = (state: RootState) => state.covid.tomorrowPredictConfirmed;
export const selectDailyData = (state: RootState) => state.covid.dailyData;
export const selectLastDay = (state: RootState) => state.covid.lastUpdate;
export const {updateDateReducer} = covidSlice.actions;
export default covidSlice.reducer;