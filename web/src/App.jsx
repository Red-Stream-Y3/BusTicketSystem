import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Dashboard, Employees, Buses, Fares, Home, Login, Register, Schedules } from './pages';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/*" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="schedules" element={<Schedules />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/buses" element={<Buses />} />
                    <Route path="/fares" element={<Fares />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
