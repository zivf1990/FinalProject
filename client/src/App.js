import "./App.css";
import Pages from "./components/Pages";
import PostProvider from "./context/PostContext";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PostProvider>
          <Pages />
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
