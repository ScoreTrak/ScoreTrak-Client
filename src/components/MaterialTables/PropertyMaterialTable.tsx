import {useSnackbar} from "notistack";
import MaterialTable, {Column} from "@material-table/core";
import {useEffect, useState} from "react";
import {GetAllRequest as GetAllRequestService} from "../../lib/scoretrakapis/scoretrak/service/v1/service_pb";
import {Severity} from "../../types/types";
import {SnackbarDismissButton} from "../SnackbarDismissButton";
import {
    DeleteRequest,
    GetAllRequest, Property, Status as ProtoStatus,
    StoreRequest,
    UpdateRequest
} from "../../lib/scoretrakapis/scoretrak/property/v1/property_pb";
import Box from "@material-ui/core/Box";
import {UUID} from "../../lib/scoretrakapis/scoretrak/proto/v1/uuid_pb";
import {CircularProgress} from "@material-ui/core";
import {gRPCClients} from "../../grpc/gRPCClients";

export enum Status {
    View = "View",
    Hide = "Hide",
    Edit = "Edit"
}

function EnumStatusToStatus (pStatus : ProtoStatus): Status | undefined {
    if (pStatus === ProtoStatus.STATUS_VIEW) return Status.View
    if (pStatus === ProtoStatus.STATUS_EDIT) return Status.Edit
    if (pStatus === ProtoStatus.STATUS_HIDE) return Status.Hide
    return undefined
}

function StatusToEnumStatus (status: Status | undefined): ProtoStatus {
    if (status === Status.View) return ProtoStatus.STATUS_VIEW
    if (status === Status.Hide) return ProtoStatus.STATUS_HIDE
    if (status === Status.Edit) return ProtoStatus.STATUS_EDIT
    return ProtoStatus.STATUS_UNSPECIFIED
}

export type propertyColumns = {
    key: string,
    serviceId: string | undefined,
    value: string | undefined,
    status: Status | undefined
}

export function propertyToPropertyColumn(property: Property): propertyColumns{
    return {
        key: property.getKey(),
        value: property.getValue()?.getValue(),
        serviceId: property.getServiceId()?.getValue(),
        status: EnumStatusToStatus(property.getStatus())
    }
}

export function propertyColumnsToProperty(propertyC: propertyColumns): Property{
    const u = new Property()
    if (propertyC.serviceId && propertyC.serviceId !== "") u.setServiceId((new UUID().setValue(propertyC.serviceId)))
    u.setKey(propertyC.key)
    if (propertyC.value && propertyC.value !== "") u.setValue((new UUID().setValue(propertyC.value)))
    u.setStatus(StatusToEnumStatus(propertyC.status))
    return u
}


export function PropertyMaterialTable() {
    const title = "Properties"
    const {enqueueSnackbar} = useSnackbar()
    const columns: Array<Column<propertyColumns>> =
        [
            {title: 'Key', field: 'key', editable: 'onAdd'},
            {title: 'Value', field: 'value'},
            {title: 'Status', field: 'status', lookup: {'View': 'View', 'Hide': 'Hide', 'Edit': 'Edit'}},
            {title: 'Service ID', field: 'serviceId', editable: 'onAdd'},
        ]
    const [state, setState] = useState<{ columns: any[], loaderService: boolean, loaderProperty: boolean, data: propertyColumns[] }>({
        columns,
        loaderService: true,
        loaderProperty: true,
        data: []
    });

    function reloadSetter() {

        gRPCClients.serviceClient.getAll(new GetAllRequestService(), {}).then(serviceResponse => {
            const lookup: Record<string, string> = {}
            for (let i = 0; i < serviceResponse.getServicesList().length; i++) {
                lookup[serviceResponse.getServicesList()[i].getId()?.getValue() as string] = `${serviceResponse.getServicesList()[i].getDisplayName()} (ID:${serviceResponse.getServicesList()[i].getId()?.getValue() as string})`
            }
            setState(prevState => {
                const columns = prevState.columns
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].field === "hostId") {
                        columns[i].lookup = lookup
                    }
                }
                return {
                    ...prevState, columns, loaderService: false
                }
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving parent Teams: ${err.message}. Error code: ${err.code}`, {
                variant: Severity.Error,
                action: SnackbarDismissButton
            })
        })

        gRPCClients.propertyClient.getAll(new GetAllRequest(), {}).then(propertiesResponse => {
            setState(prevState => {
                return {
                    ...prevState, data: propertiesResponse.getPropertiesList().map((property): propertyColumns => {
                        return propertyToPropertyColumn(property)
                    }), loaderProperty: false
                }
            })
        }, (err: any) => {
            enqueueSnackbar(`Encountered an error while retrieving Properties: ${err.message}. Error code: ${err.code}`, {
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
            {!state.loaderProperty && !state.loaderService ?
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
                                        const u = propertyColumnsToProperty(newData)
                                        storeRequest.addProperties(u, 0)
                                        gRPCClients.propertyClient.store(storeRequest, {}).then(result => {
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.push(propertyToPropertyColumn(u));
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to store property: ${err.message}. Error code: ${err.code}`, {
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
                                            const u = propertyColumnsToProperty(newData)
                                            updateRequest.setProperty(u)
                                            gRPCClients.propertyClient.update(updateRequest, {}).then(result => {
                                                setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return {...prevState, data};
                                                });
                                                resolve();
                                            }, (err: any) => {
                                                enqueueSnackbar(`Unable to update property: ${err.message}. Error code: ${err.code}`, {
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
                                        deleteRequest.setKey(oldData.key)
                                        deleteRequest.setServiceId((new UUID().setValue(oldData.serviceId as string)))

                                        gRPCClients.propertyClient.delete(deleteRequest, {}).then(result => {
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return {...prevState, data};
                                            });
                                            resolve();
                                        }, (err: any) => {
                                            enqueueSnackbar(`Unable to delete property: ${err.message}. Error code: ${err.code}`, {
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