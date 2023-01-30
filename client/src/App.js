import "./style/App.css";
import Pages from "./components/Pages";
import UserProvider from "./context/UserContext";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <Pages />
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
