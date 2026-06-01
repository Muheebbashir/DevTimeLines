import AppRoutes from "./routes/AppRoutes";
import {useSyncUser} from "./hooks/useSyncUser"

function App() {
  useSyncUser();
  return <AppRoutes />;
}

export default App;