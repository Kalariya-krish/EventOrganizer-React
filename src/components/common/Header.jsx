import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust the ../ count if needed based on your exact folder structure

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Kick them back to the public home page when they log out
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        
        {/* Logo */}
        <Link to="/" className="text-2xl text-slate-900 flex items-center tracking-tight">
          <span className="font-medium">Event</span>
          <span className="font-black">talk</span>
          <span className="text-[#F95A00] font-black">.</span>
        </Link>

        {/* Right Side Navigation */}
        <div className="flex items-center">

          {/* MAIN LINKS (Always visible to everyone) */}
          <nav className="hidden md:flex items-center gap-8 pr-8 text-sm font-bold">
            <Link 
              to="/" 
              className={`transition-colors hover:text-[#F95A00] ${path === '/' ? 'text-[#F95A00]' : 'text-slate-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`transition-colors hover:text-[#F95A00] ${path.startsWith('/events') ? 'text-[#F95A00]' : 'text-slate-900'}`}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors hover:text-[#F95A00] ${path === '/about' ? 'text-[#F95A00]' : 'text-slate-900'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors hover:text-[#F95A00] ${path === '/contact' ? 'text-[#F95A00]' : 'text-slate-900'}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* AUTH LINKS (Changes based on login state) */}
          <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
            
            {!user ? (
              // GUEST VIEW
              <>
                <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-900 hover:text-[#F95A00] transition-colors">
                  Login
                </Link>
                <Link to="/register" className="rounded-md bg-[#F95A00] px-7 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 active:scale-95 transition-all">
                  Register
                </Link>
              </>
            ) : (
              // LOGGED-IN USER VIEW
              <>
                <Link 
                  to="/user/my-events" 
                  className={`hidden sm:block text-sm font-bold transition-colors hover:text-[#F95A00] ${path.startsWith('/user/my-events') ? 'text-[#F95A00]' : 'text-slate-900'}`}
                >
                  My Events
                </Link>
                <Link 
                  to="/user/profile" 
                  className={`hidden sm:block text-sm font-bold transition-colors hover:text-[#F95A00] ${path.startsWith('/user/profile') ? 'text-[#F95A00]' : 'text-slate-900'}`}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;