import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "@buf/scoretrak_scoretrakapis.grpc_web/scoretrak/auth/v1/auth_pb";
import { gRPCClients } from "../../grpc/gRPCClients";
import { token } from "../../grpc/token/token";
import { Severity } from "../../types/types";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spinner: {
    margin: theme.spacing(1),
  },
}));

type LoginInfo = {
  username: string;
  password: string;
};

interface ILoginFormInput {
  username: String;
  password: String;
}

type LoginAlertType = {
  message: string;
  severity: Severity | undefined;
};

export default function Sign_in() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<LoginInfo>();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<LoginAlertType>({
    message: "",
    severity: undefined,
  });
  const navigate = useNavigate();

  const handleLoginFormSubmit: SubmitHandler<ILoginFormInput> = data => {
    const { username, password } = data
    setAlert({ severity: undefined, message: "" });
    setLoading(true);
    const loginRequest = new LoginRequest();
    loginRequest.setUsername(data.username);
    loginRequest.setPassword(data.password);
    gRPCClients.auth.v1.authServicePromiseClient.login(loginRequest, {}).then(
      (r) => {
        token.saveToken(r.getAccessToken());
        navigate("/");
      },
      (error) => {
        setAlert({
          severity: Severity.Error,
          message: `Failed to login: ${error.message}.(Code: ${error.code})`,
        });
        setLoading(false);
      }
    );

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {loading ? (
          <CircularProgress className={classes.spinner} />
        ) : (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleLoginFormSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={register}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={register}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          {alert.message && alert.severity && (
            <Alert severity={alert.severity}>{alert.message}</Alert>
          )}
        </form>
      </div>
    </Container>
  );
}
