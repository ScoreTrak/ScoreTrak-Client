import {Outlet} from "react-router-dom";
import {useReport} from "../contexts/ReportContext";
import React from "react";
import {CircularProgress, Typography} from "@material-ui/core";
import BaseLayout from "./BaseLayout";


export default function ScoreboardLayout() {
    const report = useReport()
    return (
        <>
            <BaseLayout>
                {report && report.Round !== 0 ?
                    <Outlet/>
                    :
                    <>
                        <CircularProgress  />

                        {
                            report?.Round === 0 &&

                            <div>
                                <Typography>Competition have not started yet!</Typography>
                                <Typography>This window will automatically reload once the first round is scored.</Typography>
                            </div>
                        }
                    </>
                }
            </BaseLayout>
        </>
    )
}