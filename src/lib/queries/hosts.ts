import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    DeleteRequest,
    GetAllRequest, GetByIDRequest,
    Host,
    StoreRequest,
    UpdateRequest
} from "../scoretrakapis/scoretrak/host/v1/host_pb";
import grpcWeb from "grpc-web";
import {gRPCClients} from "../../grpc/gRPCClients";
import {UUID} from "../scoretrakapis/scoretrak/proto/v1/uuid_pb";


export function useHostsQuery() {
    const fetchHosts = async () => {
        const hostsResponse = await gRPCClients.hostClient.getAll(new GetAllRequest(), {})
        return hostsResponse.getHostsList()
    }

    return useQuery<Host[], grpcWeb.RpcError>(["hosts"], fetchHosts)
}

export function useHostQuery(hostId: string) {
    const fetchHostById = async (id: string) => {
        const uuid = new UUID()
        uuid.setValue(id)
        const request = new GetByIDRequest()
        request.setId(uuid)
        const hostResponse = await gRPCClients.hostClient.getByID(request, {})
        return hostResponse.getHost()
    }

    return useQuery<Host | undefined, grpcWeb.RpcError>(["hosts", hostId], () => fetchHostById(hostId))
}

export function useAddHostMutation() {
    const queryClient = useQueryClient()

    const addHost = async (addHostRequest: StoreRequest) => {
        return await gRPCClients.hostClient.store(addHostRequest, {})
    }

    return useMutation(addHost, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["hosts"])
        }
    })
}

export function useUpdateHostMutation() {
    const queryClient = useQueryClient()

    const updateHost = async (updateHostRequest: UpdateRequest) => {
        return await gRPCClients.hostClient.update(updateHostRequest, {})
    }

    return useMutation(updateHost, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["hosts"])
        }
    })
}

export function useDeleteHostMutation() {
    const queryClient = useQueryClient()

    const deleteHost = async (deleteHostRequest: DeleteRequest) => {
        const deleteResponse = await gRPCClients.hostClient.delete(deleteHostRequest, {})
        return deleteHostRequest.getId()
    }

    return useMutation(deleteHost, {
        onSuccess: () => {
            return queryClient.invalidateQueries(["hosts"])
        }
    })
}
