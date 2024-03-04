import { createContext, useContext } from "react"

// Auth context model
    export type AuthContext = {
        auth: boolean,
        setAuth: (status: boolean) => void
    }

// Mock auth via context to handle global auth state
    export const MyAuthContext = createContext<AuthContext>({
        auth: false,
        setAuth: () => {}
    })
    export const useAuthContext = () => useContext(MyAuthContext)
