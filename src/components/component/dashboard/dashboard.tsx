import AppBar from "./dashboard-app-bar"
import StockSection from "./sections/stock-section"
import ProductChainSection from "./sections/product-chain-section"
import UsersSection from "./sections/users-section"

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar/>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StockSection/>
        <ProductChainSection/>
        <UsersSection/>
      </main>
    </div>
  )
}

