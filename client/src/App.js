import "./App.css";
import Header from "./components/Header";
import PostProvider from "./context/PostContext";
import UserProvider from "./context/UserContext";

function App() {


  return (
    <div className="App">
      <UserProvider>
        <PostProvider>
          <Header />
        </PostProvider >
      </UserProvider>
    </div>
  );
}

export default App;
