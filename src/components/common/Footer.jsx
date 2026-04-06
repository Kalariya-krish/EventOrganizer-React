import React from 'react'
import { X, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-950 pt-16 pb-10 font-sans text-sm">
      <div className="m-auto max-w-7xl">
        
        {/* Top Section: Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between mb-5 ">
          
          {/* Column 1: Brand & Identity (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <a href="/" className="text-2xl font-black tracking-tight text-white mb-4 block">
              Eventtalk<span className="text-orange-500">.</span>
            </a>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              The modern operating system for event creators. Seamless ticketing, powerful analytics, and unforgettable attendee experiences.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">X</span>
                <X className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

s"

          {/* Column 4: Company */}
          <div className='w-1/2'>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider ">Quick Links</h3>
            <ul className="space-y-3 text-xs">
              <li  className="text-slate-400 hover:text-white transition-colors"><Link to='/'>Home</Link></li>
              <li  className="text-slate-400 hover:text-white transition-colors"><Link to='/about'>About us</Link></li>
              <li  className="text-slate-400 hover:text-white transition-colors"><Link to='/events'>Events</Link></li>
              <li  className="text-slate-400 hover:text-white transition-colors"><Link to='/contact'>Contact us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; 2026 Eventalk Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
           
          </div>
        </div>

      </div>
    </footer>
    </div>
  )
}

export default Footer
