import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../../services/reviewService';
import { Star } from 'lucide-react';

const RatingsReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews from the server.');
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="font-bold text-slate-500">Loading reviews...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header section matching Figma Page 24 */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Ratings and Reviews</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200">{error}</div>}

      {/* Main Table matching Figma layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="px-6 py-4">ReviewId</th>
              <th className="px-6 py-4">EventId</th>
              <th className="px-6 py-4">UserId</th>
              {/* <th className="px-6 py-4">Rating</th> */}
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews?.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-bold">No reviews found yet.</td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-500">#{review._id.substring(review._id.length - 6).toUpperCase()}</td>
                  <td className="px-6 py-4 font-bold text-slate-500">#{review.event?._id.substring(review.event._id.length - 6).toUpperCase() || 'N/A'}</td>
                  <td className="px-6 py-4 font-bold text-slate-500">#{review.user?._id.substring(review.user._id.length - 6).toUpperCase() || 'N/A'}</td>
                  {/* <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      {review.rating} <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    </div>
                  </td> */}
                  <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{review.comment}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RatingsReviews;