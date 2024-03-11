import React from "react"

const LoginFormContext = React.createContext({
  formType: "sign-in",
  setFormType: () => {},
})

export default LoginFormContext