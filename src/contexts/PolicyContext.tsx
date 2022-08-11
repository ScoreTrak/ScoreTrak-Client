import {createContext, useContext, useEffect, useState} from "react";
import {GetRequest, Policy} from "../lib/scoretrakapis/scoretrak/policy/v1/policy_pb";
import {gRPCClients} from "../grpc/gRPCClients";
import grpcWeb from "grpc-web"
import {useSnackbar} from "notistack";
import {Severity} from "../types/types";
import {token} from "../grpc/token/token";
import {useNavigate} from "react-router-dom";
import {SnackbarDismissButton} from "../components/SnackbarDismissButton";

const PolicyContext = createContext<Policy.AsObject | undefined>(undefined)

export function usePolicy() {
    return useContext(PolicyContext)
}

// @ts-ignore
export function PolicyProvider({ children }) {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [policy, setPolicy] = useState<Policy.AsObject>()

    useEffect(() => {
        const streamRequest = new GetRequest()
        const stream = gRPCClients.policyClient.get(streamRequest, {})

        stream.on("error", (error: grpcWeb.RpcError) => {
            if (error.code === 7 || error.code === 16){
                enqueueSnackbar(`You are not authorized to perform this action. Please Log in`, { variant: Severity.Error, action: SnackbarDismissButton } )
                token.logout()
                navigate("/login");
            } else {
                enqueueSnackbar(`Encountered an error while fetching policy: ${error.message}. Error code: ${error.code}`, { variant: Severity.Error, action: SnackbarDismissButton })
            }
        })

        stream.on("data", (response) => {
            if (response.hasPolicy()) {
                setPolicy(response.getPolicy()!.toObject())
            }
        })

        return () => stream.cancel()
    }, [])

    return (
        <PolicyContext.Provider value={policy}>
            {children}
        </PolicyContext.Provider>
    )

}