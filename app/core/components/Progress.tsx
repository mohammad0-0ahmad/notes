import { CircularProgress, Grid } from "@mui/material";
import clsx from "clsx";
import { makeStyles } from "app/core/providers/ThemeProvider";

const Progress: FC<ProgressPropsType> = ({ page }) => {
  const { classes } = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={clsx({ [classes.Progress]: page })}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Progress;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles()(() => ({
  Progress: {
    height: "100vh",
  },
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ProgressPropsType = { page?: boolean };
