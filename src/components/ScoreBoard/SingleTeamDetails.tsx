import { useEffect, useRef, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import { Report as SimpleReport } from "../../types/report";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { useReportQuery } from "~/lib/queries/reports";
import {
  HostData,
  PropertiesData,
  SingleTeamDetailsAccordionDetailsBox,
} from "~/components/ScoreBoard/SingleTeamDetailsAccordionDetailsBox";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },

  customAccordionSuccessHeader: {
    borderRight: `1px solid ${theme.palette.success.main}`,
    borderLeft: `1px solid ${theme.palette.success.main}`,
  },
  customAccordionErrorHeader: {
    borderRight: `1px solid ${theme.palette.error.main}`,
    borderLeft: `1px solid ${theme.palette.error.main}`,
  },
  customAccordionWarningHeader: {
    borderRight: `1px solid ${theme.palette.warning.main}`,
    borderLeft: `1px solid ${theme.palette.warning.main}`,
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  button: {
    margin: theme.spacing(1),
  },

  input: {
    display: "none",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  iconSuccess: {
    color: theme.palette.success.main,
    marginRight: 12,
    fontSize: 22,
    opacity: 0.9,
  },

  iconWarning: {
    color: theme.palette.warning.main,
    marginRight: 12,
    fontSize: 22,
    opacity: 0.9,
  },

  iconError: {
    color: theme.palette.error.main,
    marginRight: 12,
    fontSize: 22,
    opacity: 0.9,
  },
}));

type CustomSingleTeamDetailsProps = {
  teamID: string;
};

export type SingleCheckDetails = {
  service_id: string;
  host_id: string;
  passed: boolean | null | undefined;
  err: string | null | undefined;
  log: string | null | undefined;
  round_id: number;
  pause: boolean;
};

export default function SingleTeamDetails(props: CustomSingleTeamDetailsProps) {
  const classes = useStyles();
  const [PropertiesData, setPropertiesData] = useState<PropertiesData[]>([]);
  const [hostData, setHostData] = useState<HostData | undefined>(undefined);
  const [expanded, setExpanded] = useState<boolean | string>(false);
  const [history, setHistory] = useState<Record<string, SingleCheckDetails[]>>(
    {}
  );

  const { data: reportData } = useReportQuery();

  const handleChange =
    (panel: string) =>
    (event: React.FormEvent<EventTarget>, isExpanded: boolean) => {
      setPropertiesData([]);
      setHostData(undefined);
      if (!isExpanded) {
        setExpanded(false);
      } else {
        setExpanded(panel);
      }
    };
  function usePreviousDT(value: SimpleReport | undefined) {
    const ref = useRef<SimpleReport>();
    useEffect(() => {
      if (value) {
        ref.current = value;
      }
    });
    return ref.current;
  }
  const prevDT = usePreviousDT(reportData);
  const teamID = props.teamID;

  useEffect(() => {
    if (prevDT) {
      setHistory((prevState) => {
        const nextState: Record<string, SingleCheckDetails[]> = {};
        Object.keys(prevState).forEach((cached_service_id) => {
          if (prevState[cached_service_id].length !== 0) {
            const prevService =
              prevDT.Teams[teamID].Hosts[
                prevState[cached_service_id][
                  prevState[cached_service_id].length - 1
                ].host_id
              ].Services;
            const check = prevService[cached_service_id].Check;
            if (!prevService[cached_service_id].Pause) {
              nextState[cached_service_id] = [
                ...prevState[cached_service_id],
                {
                  service_id:
                    prevState[cached_service_id][
                      prevState[cached_service_id].length - 1
                    ].service_id,
                  host_id:
                    prevState[cached_service_id][
                      prevState[cached_service_id].length - 1
                    ].host_id,
                  pause: prevService[cached_service_id].Pause,
                  passed: check !== null ? check?.Passed : null, // Causes a bug if cached service id doesnt exist anymore
                  err: check !== null ? check?.Err : null,
                  log: check !== null ? check?.Log : null,
                  round_id: prevDT.Round,
                },
              ];
            }
          } else {
            if (reportData) {
              Object.keys(reportData.Teams[teamID].Hosts).forEach((host) => {
                const currentHost = reportData.Teams[teamID].Hosts[host];
                Object.keys(currentHost.Services).forEach((service_id) => {
                  if (cached_service_id === service_id) {
                    nextState[service_id] = [
                      {
                        service_id,
                        host_id: host,
                        pause:
                          prevDT.Teams[teamID].Hosts[host].Services[service_id]
                            .Pause,
                        passed:
                          prevDT.Teams[teamID].Hosts[host].Services[service_id]
                            .Check?.Passed,
                        err: prevDT.Teams[teamID].Hosts[host].Services[
                          service_id
                        ].Check?.Err,
                        log: prevDT.Teams[teamID].Hosts[host].Services[
                          service_id
                        ].Check?.Log,
                        round_id: prevDT.Round,
                      },
                    ];
                  }
                });
              });
            }
          }
        });
        return nextState;
      });
    }
  }, [reportData, prevDT, teamID]);
  // TODO: REFACTOR the above

  return (
    <Box height="100%" width="100%">
      {reportData &&
        Object.keys(reportData.Teams[teamID].Hosts).map((host) => {
          const currentHost = reportData.Teams[teamID].Hosts[host];
          return Object.keys(currentHost.Services).map((service_id) => {
            const simpleService = currentHost.Services[service_id];
            let keyName;
            if (simpleService.DisplayName) {
              keyName = simpleService.DisplayName;
            } else {
              if (currentHost.HostGroup) {
                keyName = currentHost.HostGroup.Name + "-" + simpleService.Name;
              } else {
                keyName = simpleService.Name;
              }
            }
            simpleService.Pause =
              reportData.Teams[teamID].Pause ||
              (currentHost.HostGroup != null
                ? currentHost.HostGroup.Pause
                : false) ||
              currentHost.Pause ||
              currentHost.Services[service_id].Pause;
            return (
              <Accordion
                expanded={expanded === keyName}
                onChange={handleChange(keyName)}
                className={
                  !simpleService.Pause
                    ? simpleService.Check?.Passed
                      ? classes.customAccordionSuccessHeader
                      : classes.customAccordionErrorHeader
                    : classes.customAccordionWarningHeader
                }
                key={service_id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${keyName}bh-content`}
                  id={`${keyName}bh-header`}
                >
                  {!simpleService.Pause ? (
                    simpleService.Check?.Passed ? (
                      <CheckCircleOutlineIcon className={classes.iconSuccess} />
                    ) : (
                      <ErrorIcon className={classes.iconError} />
                    )
                  ) : (
                    <PauseCircleOutlineIcon className={classes.iconWarning} />
                  )}
                  <Typography className={classes.heading}>{keyName}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Host used for last round: {currentHost.Address}. Service
                    Weight: {simpleService.Weight}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {expanded === keyName && (
                    <SingleTeamDetailsAccordionDetailsBox
                      {...props}
                      history={history}
                      setHistory={setHistory}
                      host_id={host}
                      service_id={service_id}
                      simpleService={simpleService}
                      setHostData={setHostData}
                      hostData={hostData}
                      PropertiesData={PropertiesData}
                      setPropertiesData={setPropertiesData}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
            );
          });
        })}
    </Box>
  );
}
