import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import {
    Dashboard,
    Employees,
    CreateEmployee,
    UpdateEmployee,
    Buses,
    Fares,
    Home,
    Login,
    Register,
    Schedules,
} from './pages';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/*" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="schedules" element={<Schedules />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/create" element={<CreateEmployee />} />
                    <Route path="employees/:id" element={<UpdateEmployee />} />
                    <Route path="buses" element={<Buses />} />
                    <Route path="fares" element={<Fares />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
