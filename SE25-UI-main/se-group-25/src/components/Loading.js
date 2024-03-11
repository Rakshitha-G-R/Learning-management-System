import React, { useContext } from "react";
import './styles/loading.css'
import ThemeContext from "../context/ThemeContext";
function Loading (){

    const {theme} = useContext(ThemeContext)
      return( <div id='outer'>
          <div id={`middle-${theme}`}>
            
            <div id={`inner-${theme}`}>    
        </div>
        </div>
        </div>
      );
}

export default Loading
