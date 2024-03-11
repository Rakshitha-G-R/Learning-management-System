import Main from './components/Main';
import { useState, useContext, createContext } from 'react';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeContext from './context/ThemeContext'
import LoginFormContext from './context/Login-Form-Context';
function App() {
  const [theme,setTheme] = useState('light')
  const [formType, setFormType] = useState('sign-in')
  const theme_value = {theme, setTheme}
  const form_value = {formType, setFormType}
  return (
    <div className="App">
      <ThemeContext.Provider value = {theme_value}>
        <LoginFormContext.Provider value = {form_value}>
        <Router>
          <Main />
        </Router>
        </LoginFormContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
