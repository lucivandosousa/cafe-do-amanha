import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Footer from "./components/Footer/Footer"
import About from "./pages/About/About"
import Menu from "./pages/Menu/Menu"
import OrderPage from "./pages/OrderPage/OrderPage"
import Stories from "./pages/Stories/Stories"
import Contact from "./pages/Contact/Contact"
import NotFound from "./pages/NotFound/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedidos" element={<OrderPage />} />
        <Route path="/historias" element={<Stories />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

