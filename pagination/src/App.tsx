import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { CharacterList } from "./components/CharacterList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CharacterList />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;