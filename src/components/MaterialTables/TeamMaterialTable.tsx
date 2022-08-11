import {useSnackbar} from "notistack";
import MaterialTable, {Column} from "@material-table/core";
import {useEffect, useState} from "react";
import {
    DeleteRequest,
    GetAllRequest,
    StoreRequest, Team,
    UpdateRequest
} from "../../lib/scoretrakapis/scoretrak/team/v1/team_pb";
import {Severity} from "../../types/types";
import {SnackbarDismissButton} from "../SnackbarDismissButton";
import Box from "@material-ui/core/Box";
import {UUID} from "../../lib/scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {CircularProgress} from "@material-ui/core";
import {gRPCClients} from "../../grpc/gRPCClients";
import {BoolValue, UInt64Value} from "google-protobuf/google/protobuf/wrappers_pb";

export type teamColumns = {
    id: string | undefined
    name: string,
    index: number | undefined
    pause: boolean | undefined
    hide: boolean | undefined
}

export function teamToTeamColumn(team: Team): teamColumns{
    return {
        pause: team.getPause()?.getValue(),
        id: team.getId()?.getValue(),
        name: team.getName(),
        index: team.getIndex()?.getValue(),
        hide: team.getHide()?.getValue()
    }
}

export function teamColumnsToTeam(teamC: teamColumns): Team{
    const t = new Team()
    if (teamC.pause != null ) t.setPause(new BoolValue().setValue(teamC.pause))
    if (teamC.hide != null ) t.setHide(new BoolValue().setValue(teamC.hide))
    if (teamC.id && teamC.id !== "") t.setId((new UUID().setValue(teamC.id)))
    t.setName(teamC.name)
    if (teamC.index != null && !isNaN(teamC.index)) t.setIndex(new UInt64Value().setValue(teamC.index))
    return t
}



export function TeamMaterialTable() {
    const title = "Teams"
    const {enqueueSnackbar} = useSnackbar()
    const columns: Array<Column<teamColumns>> =
        [
            {title: 'ID (optional)', field: 'id', editable: 'onAdd'},
            {title: 'Team Name', field: 'name'},
            {title: 'Index', field: 'index', type: 'numeric'},
            {title: 'Hide from Scoreboard', field: 'hide', type: 'boolean', initialEditValue: false},
            {title: 'Pause Scoring', field: 'pause', type: 'boolean', initialEditValue: false},
        ]

    const [state, setState] = useState<{ columns: any[], loader: boolean, data: teamColumns[] }>({
        columns,
        loader: true,
        data: []
    });

    function reloadSetter() {
        gRPCClients.teamClient.getAll(new GetAllRequest(), {}).then(teamsResponse => {
            setState(prevState => {
                return {
                    ...prevState, data: teamsResponse.getTeamsList().map((team): teamColumns => {
                        return teamToTeamColumn(team)
                    }), loader: false
                }
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving Teams: ${err.message}. Error code: ${err.code}`, {
                variant: Severity.Error,
                action: SnackbarDismissButton
            })
        })
    }

    useEffect(() => {
        reloadSetter()
    }, []);

    return (
        <>
            {!state.loader ?
                <Box height="100%" width="100%">
                    <MaterialTable
                        title={title}
                        columns={state.columns}
                        data={state.data}
                        options={{
                            pageSizeOptions: [5, 10, 20, 50, 100, 500, 1000],
                            pageSize: 20,
                            emptyRowsWhenPaging: false
                        }}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise<void>((resolve, reject) => {
                                    setTimeout(() => {
                                        const storeRequest = new StoreRequest()
                                        const u = teamColumnsToTeam(newData)
                                        storeRequest.addTeams(u, 0)
                                        gRPCClients.teamClient.store(storeRequest, {}).then(result => {
                                            u.setId(result.getIdsList()[0])
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.push(teamToTeamColumn(u));
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to store team: ${err.message}. Error code: ${err.code}`, {
                                                variant: Severity.Error,
                                                action: SnackbarDismissButton
                                            })
                                            reject()
                                        })
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise<void>((resolve, reject) => {
                                    setTimeout(() => {
                                        if (oldData) {
                                            const updateRequest = new UpdateRequest()
                                            const u = teamColumnsToTeam(newData)
                                            updateRequest.setTeam(u)
                                            gRPCClients.teamClient.update(updateRequest, {}).then(result => {
                                                setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return {...prevState, data};
                                                });
                                                resolve();
                                            }, (err: any) => {
                                                enqueueSnackbar(`Unable to update team: ${err.message}. Error code: ${err.code}`, {
                                                    variant: Severity.Error,
                                                    action: SnackbarDismissButton
                                                })
                                                reject()
                                            })
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise<void>((resolve, reject) => {
                                    setTimeout(() => {
                                        const deleteRequest = new DeleteRequest()
                                        deleteRequest.setId((new UUID().setValue(oldData.id as string)))
                                        gRPCClients.teamClient.delete(deleteRequest, {}).then(result => {
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to delete team: ${err.message}. Error code: ${err.code}`, {
                                                variant: Severity.Error,
                                                action: SnackbarDismissButton
                                            })
                                            reject()
                                        })
                                    }, 600);
                                }),
                        }}
                    />
                </Box>
                :
                <Box height="100%" width="100%" m="auto">
                    <CircularProgress/>
                </Box>
            }
        </>
    );
}