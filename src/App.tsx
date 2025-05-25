import { MainRoute } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClientOption = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 3600 * 10 * 10
        }
    }
})

function App() {
    return (
        <QueryClientProvider client={queryClientOption}>
            <MainRoute />
        </QueryClientProvider>
    )
}

export default App;
