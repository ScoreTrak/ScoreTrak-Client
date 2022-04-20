import * as React from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { Severity } from "../../types/types";
import { LoginRequest } from "@scoretrak/scoretrakapis/scoretrak/auth/v1/auth_pb";
import { useHistory } from "react-router";
import { token } from "../../grpc/token/token";
import { AuthServiceClient } from "@scoretrak/scoretrakapis/scoretrak/auth/v1/AuthServiceClientPb";
import { getSponsors } from "../../lib/sponsors";

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

type LoginAlertType = {
  message: string;
  severity: Severity | undefined;
};

type LoginProps = {
  authClient: AuthServiceClient;
};

const Login = (props: LoginProps) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<LoginInfo>();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<LoginAlertType>({
    message: "",
    severity: undefined,
  });
  const history = useHistory();
  const sponsors = getSponsors(2);
  const handleLogin = (data: LoginInfo) => {
    setAlert({ severity: undefined, message: "" });
    setLoading(true);
    const loginRequest = new LoginRequest();
    loginRequest.setUsername(data.username);
    loginRequest.setPassword(data.password);
    props.authClient.login(loginRequest, {}).then(
      (r) => {
        token.saveToken(r.getAccessToken());
        history.push("/");
        history.go(0);
      },
      (error) => {
        setAlert({
          severity: Severity.Error,
          message: `Failed to login: ${error.message}.(Code: ${error.code})`,
        });
        setLoading(false);
      }
    );
  };

  return (
    <>
      <Container maxWidth={"xl"}>
        <Grid container spacing={1} justifyContent={"center"}>
          <Grid item xs={8}>
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
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(handleLogin)}
                >
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
                </Grid>
                <Grid item xs={8}>
            <Container maxWidth={'md'}>

                <h1>Partners</h1>

                {Object.keys(sponsors).map((key) => {
                    return <div>
                            {key == "Presenting" ?
                                <h2>Presenting Partners</h2>
                                :
                                <h2>Partners</h2>
                            }
                            <Grid container spacing={2} mt={6} justifyContent={'center'}>
                                {sponsors[key].map((sponsor) => {
                                    return <Grid item xs={key == "Platinum" ? 6 : 5} key={sponsor.Name}>
                                        {key == "Platinum" ?
                                            <Card sx={{maxWidth: 250}}>
                                                <CardMedia component={'img'} height={140} alt={sponsor.Name}
                                                           image={sponsor.LogoURL}/>
                                            </Card>
                                            :
                                            <Card sx={{maxWidth: 200}}>
                                                <CardMedia component={'img'} height={100} alt={sponsor.Name}
                                                           image={sponsor.LogoURL}/>
                                            </Card>
                                        }
                                    </Grid>
                                })}
                            </Grid>
                        </div>
                    })
                }

            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login