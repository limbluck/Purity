import { createContext, useContext } from "react"

export type AuthContext = {
    auth: boolean,
    setAuth: (status: boolean) => void
}

export const MyAuthContext = createContext<AuthContext>({
    auth: false,
    setAuth: () => {}
})

export const useAuthContext = () => useContext(MyAuthContext)
