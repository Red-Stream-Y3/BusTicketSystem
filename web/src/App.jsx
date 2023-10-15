import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import {
    Dashboard,
    Employees,
    CreateEmployee,
    UpdateEmployee,
    Buses,
    CreateBus,
    UpdateBus,
    Fares,
    CreateFare,
    UpdateFare,
    Home,
    Login,
    Register,
    Schedules,
    Stops,
    BusRoutes,
    AddRoute,
    UpdateRoute,
    AddStop,
    UpdateStop,
    CreateSchedule,
    UpdateSchedule,
    CreateStaff,
    UpdateStaff,
} from './pages';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin/*" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="schedules" element={<Schedules />} />
                    <Route path="schedules/bus-schedules" element={<CreateSchedule />} />
                    <Route path="schedules/:id" element={<UpdateSchedule />} />
                    <Route path="schedules/staff" element={<CreateStaff />} />
                    <Route path="schedules/staff/:id" element={<UpdateStaff />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/create" element={<CreateEmployee />} />
                    <Route path="employees/:id" element={<UpdateEmployee />} />
                    <Route path="buses" element={<Buses />} />
                    <Route path="buses/create" element={<CreateBus />} />
                    <Route path="buses/:id" element={<UpdateBus />} />
                    <Route path="stops" element={<Stops />} />
                    <Route path="stops/create" element={<AddStop />} />
                    <Route path="stops/:id" element={<UpdateStop />} />
                    <Route path="routes" element={<BusRoutes />} />
                    <Route path="routes/create" element={<AddRoute />} />
                    <Route path="routes/:id" element={<UpdateRoute />} />
                    <Route path="fares" element={<Fares />} />
                    <Route path="fares/create" element={<CreateFare />} />
                    <Route path="fares/:id" element={<UpdateFare />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
