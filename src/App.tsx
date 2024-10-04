// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './shadcn/Sidebar'
import Header from './shadcn/Header'
import CustomersList from './pages/CustomersList'
import AddCustomers from './pages/AddCustomers'

function App() {
  return (
    <div className='flex justify-between bg-background text-foreground space-x-4 w-[100vw] h-screen p-0'>
      <Sidebar />
      <div className='flex-1 flex flex-col gap-5 ml-0 p-5'>
        <Header />
        <main className='dark:bg-secondary rounded-lg shadow-md w-full p-4'>
          <Routes>
            <Route path='/customers' element={<CustomersList />} />
            <Route path='/customers/create' element={<AddCustomers />} />

            <Route path="*" element={<h1>This page is under construction!</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
