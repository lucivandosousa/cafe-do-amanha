import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './PageDefault.css'

export default function PageDefault() {
  return (
    <div className="page-container">
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
