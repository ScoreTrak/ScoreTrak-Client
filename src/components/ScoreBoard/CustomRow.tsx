import { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import SingleTeamDetails from "./SingleTeamDetails";
import { makeStyles } from "@material-ui/core/styles";

export type Row = { team_id: string; team_name: string };

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

type CustomRowProps = {
  key: string;
  row: Row;
};

export function CustomRow(props: CustomRowProps) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.team_name}</TableCell>
        <TableCell align="right">{row.team_id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box margin={1}>
              <SingleTeamDetails {...props} teamID={row.team_id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
