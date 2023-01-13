import { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { useReportQuery } from "~/lib/queries/reports";
import {
  SingleTeamDetailsAccordionDetailsBox
} from "~/components/ScoreBoard/Detail/SingleTeamDetailsAccordionDetailsBox";

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

export default function SingleTeamDetails(props: CustomSingleTeamDetailsProps) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState<boolean | string>(false);
  const { data: reportData } = useReportQuery();

  const handleChange =
    (panel: string) =>
    (event: React.FormEvent<EventTarget>, isExpanded: boolean) => {
      if (!isExpanded) {
        setExpanded(false);
      } else {
        setExpanded(panel);
      }
    };

  return (
    <Box height="100%" width="100%">
      {reportData &&
        Object.keys(reportData.Teams[props.teamID].Hosts).map((host_id) => {
          const host = reportData.Teams[props.teamID].Hosts[host_id];
          return Object.keys(host.Services).map((service_id) => {
            const service = host.Services[service_id];
            let keyName;
            if (service.DisplayName) {
              keyName = service.DisplayName;
            } else {
              if (host.HostGroup) {
                keyName = host.HostGroup.Name + "-" + service.Name;
              } else {
                keyName = service.Name;
              }
            }
            service.Pause =
              reportData.Teams[props.teamID].Pause ||
              (host.HostGroup != null
                ? host.HostGroup.Pause
                : false) ||
              host.Pause ||
              host.Services[service_id].Pause;
            return (
              <Accordion
                expanded={expanded === keyName}
                onChange={handleChange(keyName)}
                className={
                  !service.Pause
                    ? service.Check?.Passed
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
                  {!service.Pause ? (
                    service.Check?.Passed ? (
                      <CheckCircleOutlineIcon className={classes.iconSuccess} />
                    ) : (
                      <ErrorIcon className={classes.iconError} />
                    )
                  ) : (
                    <PauseCircleOutlineIcon className={classes.iconWarning} />
                  )}
                  <Typography className={classes.heading}>{keyName}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Host used for last round: {host.Address}. Service
                    Weight: {service.Weight}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {expanded === keyName && (
                    <SingleTeamDetailsAccordionDetailsBox
                      teamID={props.teamID}
                      hostID={host_id}
                      serviceID={service_id}
                      service={service}
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
