import "./App.css";
import List from "./components/List";
import useFirestoreContext from "./hooks/useFirestoreContext";

function App() {
  const { state } = useFirestoreContext();

  return (
    <>
      <h1 className="mb-3">Articles</h1>
      <List items={state.placeholders} />
    </>
  );
}

export default App;
