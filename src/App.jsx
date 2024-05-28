import { ToastContainer } from "react-toastify"
import Header from "./Component/Header"
import { Outlet } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <div className="mt-14">
        <ToastContainer />
        <Outlet />
      </div>
    </>
  )
}

export default App
