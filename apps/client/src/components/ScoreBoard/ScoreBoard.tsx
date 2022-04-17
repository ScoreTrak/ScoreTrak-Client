import React, {useState, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";
import {Route, useHistory} from "react-router-dom";
import Status from "./Status";
import Details from "./Details";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Button from '@mui/material/Button';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import makeStyles from '@mui/styles/makeStyles';
import {GRPCClients} from "../../grpc/gRPCClients";
import {Policy} from "../../lib/scoretrakapis/scoretrak/policy/v1/policy_pb";
import {ThemeState, SimpleReport, Severity} from "../../types/types";
import {FullScreenHandle} from "react-full-screen";
import {GetRequest, GetResponse} from "../../lib/scoretrakapis/scoretrak/report/v1/report_pb";
import {Role, token} from "../../grpc/token/token";
import clsx from "clsx";
import Ranks from "./Ranks";

const useStyles = makeStyles((theme) => ({
    hidden: { opacity: 0.1, transition: "opacity 0.2s linear"},
    visible: { opacity: 1, transition: "opacity 0.2s linear"},
    alignItemsAndJustifyContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreenButtonStyle: {
        position: 'absolute',
        maxHeight: '3vh',
        bottom: '1vh',
        marginRight: '2vh',
        right: '20px',
    }
}));

type ScoreBoardProps = {
    gRPCClients: GRPCClients,
    currentPolicy: Policy.AsObject,
    theme: ThemeState,
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    handleFullScreen: FullScreenHandle
    genericEnqueue: Function
}


export default function ScoreBoard(props : ScoreBoardProps) {
    const [report, setReport] = useState<SimpleReport | undefined>(undefined);
    const [visible, setFade] = React.useState<boolean>(false);
    const classes = useStyles();
    const handleFadeOver = () => {
        setFade(true);
    };
    const handleFadeOut = () => {
        setFade(false);
    };
    const handleFullScreen = props.handleFullScreen
    const history = useHistory();


    useEffect(() => {
        const streamRequest = new GetRequest();
        const stream = props.gRPCClients.reportClient.get(streamRequest, {})
        stream.on('error', (err: any) => {
            if (err.code === 7 || err.code === 16){
                token.logout()
                history.push("/login");
            } else{
                props.genericEnqueue(`Encountered an error while fetching report: ${err.message}. Error code: ${err.code}`, Severity.Error)
            }
        });
        stream.on("data", (response) => {
            const cache = (response as GetResponse).getReport()?.getCache()
            if (cache != null) {
                const simpleReport = JSON.parse(cache) as SimpleReport
                setReport(simpleReport)
                props.setTitle(`Round: ${simpleReport.Round}`)
            } else {
                props.setTitle("")
            }
        });
        return () => stream.cancel();
    }, []);

    return (
            <Box className={classes.alignItemsAndJustifyContent} height="100%" width="100%"  >
                { report && report.Round !== 0 ?
                    <Box m="auto" style={{height: handleFullScreen.active ? '100vh' : '85vh', width: '100%'}}>
                        { (props.currentPolicy.showPoints?.value || token.getCurrentRole() === Role.Black) &&
                        <Route exact path='/ranks' render={() => (
                            <Ranks isDarkTheme={props.theme.isDarkTheme} report={report}/>
                        )}/>
                        }
                        <Route exact path='/' render={() => (
                            <Status currentPolicy={props.currentPolicy} isDarkTheme={props.theme.isDarkTheme} report={report}/>
                        )} />
                        <Route exact path='/details' render={() => (
                            <Details isDarkTheme={props.theme.isDarkTheme} report={report} gRPCClients={props.gRPCClients} genericEnqueue={props.genericEnqueue}/>
                        )} />
                    </Box>

                        :
                    <div>
                    <CircularProgress  />

                    {
                        report?.Round === 0 &&
                            <div>
                                <Typography>Competition have not started yet!</Typography>
                                <Typography>This window will automatically reload once the first round is scored.</Typography>
                            </div>
                    }
                    </div>
                    }
                    {handleFullScreen.active ?
                        <Button
                            className={clsx(classes.fullScreenButtonStyle, visible ? classes.visible : classes.hidden)}
                            startIcon={<FullscreenExitIcon />}
                            onClick={handleFullScreen.exit}
                            onMouseOver={handleFadeOver}
                            onMouseOut={handleFadeOut}

                        >Exit Full Screen</Button>
                        :
                        <Button
                            className={clsx(classes.fullScreenButtonStyle, visible ? classes.visible : classes.hidden)}
                            startIcon={<FullscreenIcon />}
                            onClick={handleFullScreen.enter}
                            onMouseOver={handleFadeOver}
                            onMouseOut={handleFadeOut}
                        >Enter Full Screen</Button>
                    }
            </Box>
    );
}