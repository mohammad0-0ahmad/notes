import { Trans } from "@m0-0a/next-intl";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "app/core/providers/ThemeProvider";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { signIn } from "next-auth/react";

const EntryForm = () => {
  const { classes } = useStyles({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const EyeIcon = isPasswordVisible ? VisibilityIcon : VisibilityOffIcon;

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target?.querySelector('[name="email"]').value;
    const password = e.target?.querySelector('[name="password"]').value;
    signIn("credentials", { redirect: false, email, password });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.EntryFormContainer}
    >
      <Paper elevation={3}>
        <Grid
          container
          component="form"
          direction="column"
          className={classes.EntryForm}
          onSubmit={handleSubmit}
          spacing={3}
        >
          <Grid item>
            <Typography component="h1" variant="h3" color="primary" textAlign="center">
              <Trans i18nKey="EntryForm.title" />
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label={<Trans i18nKey="EntryForm.email.label" />}
              type="text"
              name="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label={<Trans i18nKey="EntryForm.password.label" />}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsPasswordVisible((c) => !c)}>
                      <EyeIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container>
            <Button type="submit" startIcon={<LoginIcon />} fullWidth>
              <Trans i18nKey="EntryForm.submit.label" />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EntryForm;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles()(({ spacing }) => ({
  EntryFormContainer: {
    height: "100vh",
    background: "transparent",
  },
  EntryForm: {
    padding: spacing(3),
    minWidth: 400,
    "&>*": { margin: spacing(1, 0) },
  },
}));
