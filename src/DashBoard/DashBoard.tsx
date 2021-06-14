import React, { useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import styles from "./DashBoard.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Button,
    IconButton
} from "@material-ui/core";

import Chart from "../Chart/Chart";
import Cards from "../Card/Cards";
import {fetchAsyncGetPastData, fetchAsyncGetPredictData , selectDailyData, selectLastDay, updateDateReducer} from "../covidSlice"

const useStyles = makeStyles((theme) => ({
    title:{
        flexGrow: 1,
    },
    content: {
        marginTop:85,
    },
    }),
);

const DashBoard: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lastUpdate = useSelector(selectLastDay);

    useEffect(()=> {
        // dispatch(updateDateReducer);
        dispatch(fetchAsyncGetPastData());
        dispatch(fetchAsyncGetPredictData());
    }, [dispatch]);

    return (
        <div>
            <AppBar position="absolute" color="secondary">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Covid 19 Live Dashboard
                    </Typography>
                    {lastUpdate && (
                        <Typography variant="body1">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
            <Container className={classes.content}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        <Chart />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Cards />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default DashBoard;