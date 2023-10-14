import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SideNavBar, Footer } from './components';
import { Login, Register, Dashboard, Employees, Buses, Fares } from './pages';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {/* <SideNavBar /> */}
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/buses" element={<Buses />} />
                <Route path="/fares" element={<Fares />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
