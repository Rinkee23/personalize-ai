import { Route, Routes } from "react-router"
import Analytics from "../pages/Analytics.tsx"
import Campaigns from "../pages/Campaigns.tsx"
import Customers from "../pages/Customers.tsx"
import Dashboard from "../pages/Dashboard.tsx"
import Events from "../pages/Events.tsx"
import Experiments from "../pages/Experiments.tsx"
import Home from "../pages/Home.tsx"
import NotFound from "../pages/NotFound.tsx"
import Products from "../pages/Products.tsx"
import Recommendations from "../pages/Recommendations.tsx"
import Segments from "../pages/Segments.tsx"
import Settings from "../pages/Settings.tsx"
import { Layout } from "../components/layout/Layout.tsx"

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/products" element={<Products />} />
        <Route path="/segments" element={<Segments />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
