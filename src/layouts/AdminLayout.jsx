import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CalendarDays, PlusCircle, Users, ClipboardList, Star, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To highlight the active menu item

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* PERSISTENT SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-extrabold text-white">Eventalk. <span className="text-orange-500 text-sm align-top">Admin</span></h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${isActive('/admin/dashboard') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          
          <Link to="/admin/manage-events" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/manage-events') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <CalendarDays className="w-5 h-5" /> Manage Events
          </Link>
          
          <Link to="/admin/createevent" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/createevent') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <PlusCircle className="w-5 h-5" /> Add New Event
          </Link>
          
          <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/users') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5" /> User List
          </Link>

          <Link to="/admin/registrations" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/registrations') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <ClipboardList className="w-5 h-5" /> Registration
          </Link>

          <Link to="/admin/reviews" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/reviews') ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Star className="w-5 h-5" /> Rating and Review
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-500/10 hover:text-red-500 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      {/* We add margin-left 64 (256px) because the sidebar is fixed */}
      <main className="flex-1 p-10 ml-64">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;