import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Input } from '../UI/ProfessionalComponents';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to newsletter!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '9999px',
        },
        icon: '📧',
      });
      setEmail('');
    } catch (error) {
      setError(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const marqueeContent = (
    <div className="flex flex-shrink-0 items-center justify-around">
      <p className="px-8 text-3xl font-professional-bold text-professional-muted">IEEE VMEG</p>
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-professional-blue shadow-professional-lg">
        <ArrowUpRight className="h-7 w-7 text-white" />
      </div>
    </div>
  );

  return (
    <div>
      <Toaster />
      <div className="relative w-full">
        {/* main container with professional styling */}
        <div className="rounded-t-3xl rounded-b-[200px] bg-white p-8 sm:p-10 lg:p-16 relative shadow-professional-xl border border-professional-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 mb-12 lg:mb-4">
            {/* Column 1: Branding and Newsletter */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <img
                  className="h-12 w-auto"
                  src="https://res.cloudinary.com/doyh3fqr5/image/upload/c_crop,w_1000,h_780/v1750524389/IEEE_VCE_SB_-_TBG_j8tonl.png"
                  alt="IEEE VCE SB Logo"
                />
                <h3 className="text-xl font-professional-bold text-professional-primary">IEEE Vardhaman</h3>
              </div>

              <p className="text-base font-professional-semibold leading-7 text-professional-primary mb-4">Subscribe to our newsletter</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-x-2">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(''); // Clear error when user types
                    }}
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    className="px-6"
                  >
                    Subscribe
                  </Button>
                </div>
                {error && (
                  <div className="flex items-center gap-x-2 text-professional-error text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4 className="font-professional-semibold text-professional-primary">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-professional-secondary">
                <li><a href="/upcoming-events" className="hover:text-professional-blue transition-colors">Upcoming Events</a></li>
                <li><a href="/societies" className="hover:text-professional-blue transition-colors">Societies</a></li>
                <li><a href="/councils" className="hover:text-professional-blue transition-colors">Councils</a></li>
                <li><a href="/team" className="hover:text-professional-blue transition-colors">Developer Team</a></li>
                <li><a href="/newsletters" className="hover:text-professional-blue transition-colors">Newsletters</a></li>
              </ul>
            </div>

            {/* Column 3: Media */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4 className="font-professional-semibold text-professional-primary">Media</h4>
              <ul className="mt-4 space-y-2 text-sm text-professional-secondary">
                <li><a href="/gallery" className="hover:text-professional-blue transition-colors">Gallery</a></li>
                <li><a href="/journey" className="hover:text-professional-blue transition-colors">Journey</a></li>
                <li><a href="/achievements" className="hover:text-professional-blue transition-colors">Achievements</a></li>
              </ul>
            </div>

            {/* Column 4: Support & Social */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-professional-semibold text-professional-primary">Follow us at</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-professional-surface border border-professional-border">
                    <Twitter className="h-4 w-4 text-professional-secondary" />
                  </div>
                  <a href="#" className="text-professional-secondary hover:text-professional-blue transition-colors">Twitter</a>
                </li>
                <li className="flex items-center gap-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-professional-surface border border-professional-border">
                    <Instagram className="h-4 w-4 text-professional-secondary" />
                  </div>
                  <a href="#" className="text-professional-secondary hover:text-professional-blue transition-colors">Instagram</a>
                </li>
                <li className="flex items-center gap-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-professional-surface border border-professional-border">
                    <Linkedin className="h-4 w-4 text-professional-secondary" />
                  </div>
                  <a href="#" className="text-professional-secondary hover:text-professional-blue transition-colors">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col items-center space-y-3">
          <p className="text-center text-professional-muted text-sm">
            © 2025 All copyrights reserved by IEEE Vardhaman.
          </p>
          <Link 
            to="/login" 
            className="text-xs text-professional-secondary hover:text-professional-blue transition-colors underline underline-offset-2"
          >
            Admin Login
          </Link>
        </div>

        {/* "Let's Talk" Marquee */}
        <div className="relative mt-12 h-[60px] w-full overflow-hidden mb-1">
          <div className="flex absolute left-0 animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-shrink-0">
                {marqueeContent}
              </div>
            ))}
          </div>
          <div className="flex absolute left-0 animate-marquee2 whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-shrink-0">
                {marqueeContent}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};
