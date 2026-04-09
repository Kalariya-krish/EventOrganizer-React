import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import ProtectedRoute from './ProtectedRoute';


import Home from '../pages/public/home/Home';
import EventList from '../pages/public/events/EventList';
import EventDetailPage from '../pages/public/events/EventDetailPage';
import Contact from '../pages/public/contact/contact';
import About from '../pages/public/about/about';
import Login from '../pages/public/login/Login';
import RegisterPage from '../pages/public/register/RegisterPage';
import CreateEvent from '../pages/admin/CreateEvent';
import MyEventsPage from '../pages/user/MyEventsPage';
import UserProfilePage from '../pages/user/profile/UserProfilePage';
import EventsPage from '../pages/EventsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLayout from '../layouts/AdminLayout';
import ManageEvents from '../pages/admin/ManageEvents';
import UserList from '../pages/admin/UserList';
import EventRegistrations from '../pages/admin/EventRegistrations';
import RatingsReviews from '../pages/admin/RatingsReviews';
import EventDetails from '../pages/public/events/EventDetailPage';
import ForgotPassword from '../pages/public/login/ForgotPassword';
import ConfirmAttendancePage from '../pages/user/ConfirmAttendancePage';
// import ConfirmAttendancePage from '../pages/user/ConfirmAttendancePage';


const AppRoutes = () => {
  return (
    <div>
       <Routes>
      
     
      <Route element={<PublicLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<EventList />} />
        <Route path='/events/:id' element={<EventDetailPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/register' element={<RegisterPage />} />


        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/event" element={<EventsPage />} />

          <Route path='*' element={<div className="min-h-screen flex items-center justify-center bg-slate-50">
            <h1 className="text-4xl font-bold text-slate-500">404 - Page Not Found</h1>
          </div>} />

            {/* admin routes */}
            

            

            <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-events" element={<ManageEvents />} />
            <Route path="/admin/createevent" element={<CreateEvent />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/registrations" element={<EventRegistrations />} />
            <Route path="/admin/reviews" element={<RatingsReviews />} />
          </Route>

 
      </Route>

      <Route element={<ProtectedRoute />}>
    
        <Route element={<UserLayout />}>
        
          <Route path='/user/my-events' element={<MyEventsPage />} />
          <Route path='/user/profile' element={<UserProfilePage />} />
          <Route path='/events/:id/confirm' element={<ConfirmAttendancePage />} />
          {/* <Route path='/events/confirm-attendance' element={<ConfirmAttendancePage />} /> */}
        </Route>
        
      </Route>

    </Routes>
    </div>
  )
}

export default AppRoutes