import Layout from "./components/Layout/Layout"
import AppRoutes from "./routes"
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { FavoritesProvider } from "./contexts/FavouritesContext";

function App() {

  return (
    <Layout>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </Layout>
  )
}

export default App
