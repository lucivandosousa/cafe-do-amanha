import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Menu from "./pages/Menu/Menu"
import OrderPage from "./pages/OrderPage/OrderPage"
import Stories from "./pages/Stories/Stories"
import Contact from "./pages/Contact/Contact"
import NotFound from "./pages/NotFound/NotFound"
import PageDefault from "./pages/PageDefault/PageDefault"
import { Flip, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageDefault />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pedidos" element={<OrderPage />} />
          <Route path="/historias" element={<Stories />} />
          <Route path="/contato" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        autoClose={3000}
        transition={Flip}
      />
    </BrowserRouter>
  )
}

