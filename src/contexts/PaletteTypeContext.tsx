import React, {createContext, useContext} from "react";
import {useLocalStorage} from "react-use";
import {PaletteType} from "@material-ui/core";

interface PaletteTypeContextType {
    paletteType: PaletteType
    togglePaletteType: () => void
    setPaletteType: (paletteType: PaletteType) => void
}

export const PaletteTypeContext = createContext<PaletteTypeContextType>({paletteType: "dark", togglePaletteType: () => {}, setPaletteType: () => {}})

export function usePaletteType() {
    return useContext(PaletteTypeContext)
}

// @ts-ignore
export function PaletteTypeContextProvider({ children }) {
    const [paletteType, setPaletteType] = useLocalStorage<PaletteType>("theme", "dark");
    const togglePaletteType = () => setPaletteType(paletteType === "light" ? "dark" : "light")
    const strictPaletteType = paletteType ?? "dark"

    const value = {paletteType: strictPaletteType, togglePaletteType, setPaletteType}

    return (
        <PaletteTypeContext.Provider value={value}>
            {children}
        </PaletteTypeContext.Provider>
    )
}