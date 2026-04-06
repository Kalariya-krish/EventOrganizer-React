import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Accept real database 'events' as a prop
const EventCard = ({ events }) => {
  const navigate = useNavigate();

  if (!events || events.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event._id} className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-lg hover:border-slate-300">
          
          <div className="h-48 w-full bg-slate-50 flex items-center justify-center text-slate-400 border-b border-slate-100 overflow-hidden">
            <img 
              src={`https://source.unsplash.com/800x600/?${event.category}`} 
              alt={event.title} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Event' }}
            />
          </div>

          <div className="p-6 flex flex-col grow">
            <div className="flex items-start justify-between mb-3 gap-4">
              <h3 className="text-xl font-bold text-slate-900 line-clamp-2">{event.title}</h3>
              <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F95A00]">
                {event.category === 'Technology' ? 'Tech' : event.category}
              </span>
            </div>
            
            <p className="text-sm text-slate-500 mb-6 grow line-clamp-3">
              {event.description}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar className="h-4 w-4 text-[#F95A00]" /> 
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-[#F95A00]" /> {event.location}
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-sm font-bold ${event.availableSeats > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {event.availableSeats > 0 ? 'Seats Available' : 'Sold Out'}
              </span>
             <button 
  onClick={() => navigate(`/events/${event._id}`)} 
  className="rounded-lg bg-[#F95A00] px-6 py-2 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95"
>
  View Event
</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;