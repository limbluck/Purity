import { MyAuthContext } from './context/auth.context'
import Header from './components/page-elements/Header'
import { useState } from 'react';

function App() {

  const [authContext, setAuthContext] = useState(false)

  return (
    <>
      <MyAuthContext.Provider value={{auth: authContext, setAuth: setAuthContext}}>
      <Header />
      </MyAuthContext.Provider>
    </>
  )
}

export default App
