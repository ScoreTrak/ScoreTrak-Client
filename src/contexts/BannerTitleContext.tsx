import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

interface TitleContextType {
    bannerTitle: string
    setBannerTitle: Dispatch<SetStateAction<string>>
}

const BannerTitleContext = createContext<TitleContextType>({ bannerTitle: "", setBannerTitle: () => {} })

export function useBannerTitle() {
    return useContext(BannerTitleContext)
}


// @ts-ignore
export function TitleContextProvider({children}) {
    const [bannerTitle, setBannerTitle] = useState<string>("")

    return (
        <BannerTitleContext.Provider value={{ bannerTitle: bannerTitle, setBannerTitle: setBannerTitle }}>
            {children}
        </BannerTitleContext.Provider>
    )
}