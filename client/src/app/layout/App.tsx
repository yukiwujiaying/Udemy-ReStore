import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useState } from "react";

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const darkTheme = createTheme({
    palette: {
      mode: paletteType,   
      background: {
        default: paletteType==='light'?'#eaeaea' :'#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkmode(!darkMode);
  }

  return (
   <ThemeProvider theme={darkTheme}>
     <CssBaseline />
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
     <Container>
       <Catalog/>        
     </Container>
    </ThemeProvider> 
  
  );
}

export default App;
