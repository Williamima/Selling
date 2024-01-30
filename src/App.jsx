import { useUserContext } from "./Providers/UserContext"
import { RoutesMain } from "./routes/RoutesMais"

function App() {
  const { loadingPage } = useUserContext();

  return (
    <>
      <div>
        <RoutesMain />       
      </div>
    </>
  )
}

export default App
