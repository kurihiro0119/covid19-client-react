import React, { useEffect } from "react";
import { configureStore, ThunkAction, Action, createAction } from '@reduxjs/toolkit';
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import { RootState } from "./app/store";
import { RSA_X931_PADDING } from "constants";

const apiUrl = "https://covid19.mathdro.id/api";


type DailyData = {
  reportDate: string,
  confirmed: number;
  deaths: number;
  recoverd: number;
};

type CovidState = {
  dailyData: {
    reportDate: string,
    confirmed: number;
    deaths: number;
    recoverd: number;
  }[];
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
  dailyData: [
    {
      reportDate: "2020-01-22",
      confirmed: 0,
      deaths: 0,
      recoverd: 0,
    },
    {
      reportDate: "2020-01-23",
      confirmed: 1,
      deaths: 0,
      recoverd: 0,
    },
    {
      reportDate: "2020-01-24",
      confirmed: 2,
      deaths: 0,
      recoverd: 0,
    },
    {
      reportDate: "2020-01-25",
      confirmed: 5,
      deaths: 0,
      recoverd: 0,
    },
    {
      reportDate: "2020-01-26",
      confirmed: 12,
      deaths: 0,
      recoverd: 0,
    },    
  ],
  today: new Date(),
  lastUpdate: getTodayString(),
  todayConfirmed: 100,
  tomorrowPredictConfirmed: 120,
}

export const fetchAsyncGetPastData = createAsyncThunk("covid/get", async() =>{
  const { data } = await axios.get<DailyData[]>(apiUrl);
  return data;
});

export const fetchAsyncGetPredictData = createAsyncThunk("predict/get", async() =>{
  const { data } = await axios.get<DailyData[]>(apiUrl);
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
      };
    });
    builder.addCase(fetchAsyncGetPredictData.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
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