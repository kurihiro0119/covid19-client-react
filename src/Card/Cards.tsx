import React from "react";
import styles from "./Card.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import {selecttoday, selecttodayConfirmed, selecttomorrowPredictConfirmed} from "../covidSlice";
import { MdPermContactCalendar } from "react-icons/md";

const Cards: React.FC = () => {
    const todayData = useSelector(selecttoday);
    // const tommorowData = new Date(todayData.setDate(todayData.getDate() + 1));
    const todayConfirmed = useSelector(selecttodayConfirmed);
    const tommorowPredictConfirmed = useSelector(selecttomorrowPredictConfirmed);

    return(
        <div className={styles.container}>
        <Grid container spacing={1} justify="center">
        <Grid item xs={10} md={8} component={Card} className={styles.display}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Today
            </Typography>
            <Typography variant="h4">
              {todayConfirmed}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={10} md={8} component={Card} className={styles.display}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tomorrow
            </Typography>
            <Typography variant="h4">
              {tommorowPredictConfirmed}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      </div>
    );
}

export default Cards;