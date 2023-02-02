import "./style/App.css";

import Pages from "./components/Pages";
import UserProvider from "./context/UserContext";
import CartProvider from "./context/CartContext";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import ModeToggle from "./components/ModeToggle";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <CssVarsProvider>
          <Pages />
          </CssVarsProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
