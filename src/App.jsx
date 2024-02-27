import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import Home from './Home'
import PageOne from './assets/pages/PageOne'
import PageTwo from './assets/pages/PageTwo'
export default function App() {



  return (
    <BrowserRouter>

      <nav className='flex items-center justify-center'>
        <ul className='flex gap-3	pt-5 text-xl '>
          <li>
            <Link to={"/"}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to={"/PageOne"}>
              PageOne
            </Link>
          </li>
          <li>
            <Link to={"/PageTwo"}>
              PageTwo
            </Link>
          </li>
        </ul>
      </nav>


      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path='/PageOne' element={<PageOne />} />
        <Route path='/PageTwo' element={<PageTwo />} />
      </Routes>

    </BrowserRouter>
  )
}
