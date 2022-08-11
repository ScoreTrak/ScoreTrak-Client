import {useSnackbar} from "notistack";
import MaterialTable, {Column} from "@material-table/core";
import {useEffect, useState} from "react";
import {
    GetAllRequest as GetAllRequestHostGroup
} from "../../lib/scoretrakapis/scoretrak/host_group/v1/host_group_pb";
import {Severity} from "../../types/types";
import {SnackbarDismissButton} from "../SnackbarDismissButton";
import {GetAllRequest as GetAllRequestTeam} from "../../lib/scoretrakapis/scoretrak/team/v1/team_pb";
import {
    DeleteRequest,
    GetAllRequest, Host,
    StoreRequest,
    UpdateRequest
} from "../../lib/scoretrakapis/scoretrak/host/v1/host_pb";
import Box from "@material-ui/core/Box";
import {UUID} from "../../lib/scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {CircularProgress} from "@material-ui/core";
import {BoolValue, StringValue} from "google-protobuf/google/protobuf/wrappers_pb";
import { gRPCClients } from "../../grpc/gRPCClients";

export type hostColumns = {
    id: string | undefined
    pause: boolean | undefined
    hide: boolean | undefined
    editHost: boolean | undefined
    address: string
    addressListRange: string | undefined
    hostGroupId: string | undefined
    teamId: string | undefined
}


export function defaultHostColumns(): hostColumns {
    return {
        address: "", addressListRange: "", editHost: false, pause: false, hide: false, hostGroupId: undefined, id: undefined, teamId: undefined
    }
}



export function hostToHostColumn(host: Host): hostColumns{
    return {
        id: host.getId()?.getValue(),
        pause: host.getPause()?.getValue(),
        hide: host.getHide()?.getValue(),
        address: host.getAddress(),
        editHost: host.getEditHost()?.getValue(),
        hostGroupId: host.getHostGroupId()?.getValue(),
        teamId: host.getTeamId()?.getValue(),
        addressListRange: host.getAddressListRange()?.getValue()
    }
}

export function hostColumnsToHost(hostC: hostColumns): Host{
    const u = new Host()
    if (hostC.id && hostC.id !== "") u.setId((new UUID().setValue(hostC.id)))
    if (hostC.hostGroupId && hostC.hostGroupId !== "") u.setHostGroupId((new UUID().setValue(hostC.hostGroupId)))
    if (hostC.teamId && hostC.teamId !== "") u.setTeamId((new UUID().setValue(hostC.teamId)))
    if (hostC.hide != null ) u.setHide(new BoolValue().setValue(hostC.hide))
    if (hostC.pause != null ) u.setPause(new BoolValue().setValue(hostC.pause))
    if (hostC.editHost != null ) u.setEditHost(new BoolValue().setValue(hostC.editHost))
    if (hostC.addressListRange != null ) u.setAddressListRange(new StringValue().setValue(hostC.addressListRange))
    u.setAddress(hostC.address)
    return u
}

export function HostMaterialTable() {
    const title = "Hosts"
    const {enqueueSnackbar} = useSnackbar()
    const columns: Array<Column<hostColumns>> =
        [
            {title: 'ID (optional)', field: 'id', editable: 'onAdd'},
            {title: 'Address', field: 'address'},
            {title: 'Host Group ID', field: 'hostGroupId'},
            {title: 'Team ID', field: 'teamId'},
            {title: 'Hide from Scoreboard', field: 'hide', type: 'boolean', initialEditValue: false},
            {title: 'Pause Scoring', field: 'pause', type: 'boolean', initialEditValue: false},
            {title: 'Edit Host(Allow users to change Addresses)', field: 'editHost', type: 'boolean'},
            {
                title: "Address Range(comma separated list of allowed CIDR ranges and hostnames)",
                field: 'addressListRange'
            }
        ]

    const [state, setState] = useState<{ columns: any[], loaderTeam: boolean, loaderHost: boolean, loaderHostGroup: boolean, data: hostColumns[] }>({
        columns,
        loaderTeam: true,
        loaderHost: true,
        loaderHostGroup: true,
        data: []
    });

    function reloadSetter() {

        gRPCClients.hostGroupClient.getAll(new GetAllRequestHostGroup(), {}).then(hostsGroupResponse => {
            const lookup: Record<string, string> = {}
            for (let i = 0; i < hostsGroupResponse.getHostGroupsList().length; i++) {
                lookup[hostsGroupResponse.getHostGroupsList()[i].getId()?.getValue() as string] = `${hostsGroupResponse.getHostGroupsList()[i].getName()} (ID:${hostsGroupResponse.getHostGroupsList()[i].getId()?.getValue() as string})`
            }
            setState(prevState => {
                const columns = prevState.columns
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].field === "hostGroupId") {
                        columns[i].lookup = lookup
                    }
                }
                return {
                    ...prevState, columns, loaderHostGroup: false
                }
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving parent Host Groups: ${err.message}. Error code: ${err.code}`, {
                variant: Severity.Error,
                action: SnackbarDismissButton
            })
        })

        gRPCClients.teamClient.getAll(new GetAllRequestTeam(), {}).then(teamResponse => {
            const lookup: Record<string, string> = {}
            for (let i = 0; i < teamResponse.getTeamsList().length; i++) {
                lookup[teamResponse.getTeamsList()[i].getId()?.getValue() as string] = `${teamResponse.getTeamsList()[i].getName()} (ID:${teamResponse.getTeamsList()[i].getId()?.getValue() as string})`
            }
            setState(prevState => {
                const columns = prevState.columns
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].field === "teamId") {
                        columns[i].lookup = lookup
                    }
                }
                return {...prevState, columns, loaderTeam: false}
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving parent Teams: ${err.message}. Error code: ${err.code}`, {
                variant: Severity.Error,
                action: SnackbarDismissButton
            })
        })
        gRPCClients.hostClient.getAll(new GetAllRequest(), {}).then(hostsResponse => {
            setState(prevState => {
                return {
                    ...prevState, data: hostsResponse.getHostsList().map((host): hostColumns => {
                        return hostToHostColumn(host)
                    }), loader: false, loaderHost: false
                }
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving Hosts: ${err.message}. Error code: ${err.code}`, {
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
            {!state.loaderHost && !state.loaderTeam && !state.loaderHostGroup ?
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
                                        const u = hostColumnsToHost(newData)
                                        storeRequest.addHosts(u, 0)
                                        gRPCClients.hostClient.store(storeRequest, {}).then(result => {
                                            u.setId(result.getIdsList()[0])
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.push(hostToHostColumn(u));
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to store Host: ${err.message}. Error code: ${err.code}`, {
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
                                            const u = hostColumnsToHost(newData)
                                            updateRequest.setHost(u)
                                            gRPCClients.hostClient.update(updateRequest, {}).then(result => {
                                                setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return {...prevState, data};
                                                });
                                                resolve();
                                            }, (err: any) => {
                                                enqueueSnackbar(`Unable to update Host: ${err.message}. Error code: ${err.code}`, {
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
                                        gRPCClients.hostClient.delete(deleteRequest, {}).then(result => {
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to delete Host: ${err.message}. Error code: ${err.code}`, {
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