import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/home/LandingPage.jsx'
import ListCars from '../pages/cars/ListCars.jsx'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/cars" element={<ListCars />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;