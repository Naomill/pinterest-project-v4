import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronDown,
  X,
  Edit2,
  UserPlus,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RecentSearch {
  id: string;
  term: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        inboxRef.current &&
        !inboxRef.current.contains(event.target as Node)
      ) {
        setIsInboxOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        term: term.trim(),
      };

      const updatedSearches = [
        newSearch,
        ...recentSearches
          .filter((search) => search.term !== term.trim())
          .slice(0, 4),
      ];

      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };

  const removeRecentSearch = (id: string) => {
    const updatedSearches = recentSearches.filter((search) => search.id !== id);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const suggestions = [
    {
      title: 'Graphic poster',
      imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69',
    },
    {
      title: 'Pixel art',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    },
    {
      title: 'Japanese painting',
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
    },
    {
      title: 'Site design',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-[2000px] mx-auto px-4 flex items-center h-16 gap-4">
        <Link to="/" className="text-red-600">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            aria-label="Pinterest"
            role="img"
          >
            <path
              d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
              fill="currentColor"
            />
          </svg>
        </Link>

        <Link
          to="/"
          className={`px-4 py-2 rounded-full ${
            location.pathname === '/'
              ? 'bg-black text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          Home
        </Link>

        <Link
          to="/create"
          className={`px-4 py-2 rounded-full ${
            location.pathname === '/create'
              ? 'bg-black text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          Create
        </Link>

        <div className="flex-1 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchTerm);
                }
              }}
              className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
              {recentSearches.length > 0 && (
                <>
                  <h3 className="text-base font-semibold mb-2">
                    Recent searches
                  </h3>
                  <div className="space-y-1 mb-4">
                    {recentSearches.map((search) => (
                      <div
                        key={search.id}
                        className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        <span className="text-gray-700">{search.term}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(search.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="text-base font-semibold mb-2">Ideas for you</h3>
              <div className="grid grid-cols-2 gap-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(suggestion.title)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <img
                      src={suggestion.imageUrl}
                      alt={suggestion.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span className="text-sm font-medium">
                      {suggestion.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="w-6 h-6" />
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Updates</h3>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 mb-4"
                  >
                    <path
                      d="M19 13.5C19 16.5376 16.5376 19 13.5 19C10.4624 19 8 16.5376 8 13.5C8 10.4624 10.4624 8 13.5 8C16.5376 8 19 10.4624 19 13.5Z"
                      fill="#DDECF2"
                    />
                    <path
                      d="M13.5 22C17.6421 22 21 18.6421 21 14.5C21 10.3579 17.6421 7 13.5 7C9.35786 7 6 10.3579 6 14.5C6 18.6421 9.35786 22 13.5 22Z"
                      fill="#DDECF2"
                    />
                    <path
                      d="M13.5 22C17.6421 22 21 18.6421 21 14.5C21 10.3579 17.6421 7 13.5 7C9.35786 7 6 10.3579 6 14.5C6 18.6421 9.35786 22 13.5 22Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 19C16.5376 19 19 16.5376 19 13.5C19 10.4624 16.5376 8 13.5 8C10.4624 8 8 10.4624 8 13.5C8 16.5376 10.4624 19 13.5 19Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 10.5L16.5 9.5L17.5 10.5"
                      stroke="#FFC700"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 16.5L9.5 15.5L10.5 14.5"
                      stroke="#FFC700"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-700 text-center mb-2">
                    Nothing to see here (yet)!
                  </p>
                  <p className="text-gray-500 text-center text-sm mb-4">
                    Try exploring your home feed, creating a board or following
                    someone with ideas that inspire you.
                  </p>
                  <button className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                    Go to home feed
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={inboxRef}>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsInboxOpen(!isInboxOpen)}
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            {isInboxOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Inbox</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3">
                    <Edit2 className="w-5 h-5 text-red-600" />
                    <span>New message</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-gray-500" />
                    <span>Invite your friends</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center" ref={profileButtonRef}>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => navigate('/profile')}
            >
              <User className="w-6 h-6" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              ref={profileDropdownRef}
            >
              <ChevronDown size={24} />
            </button>
          </div>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              style={{ top: '100%' }}
              ref={dropdownRef}
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 rounded-full p-2">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">User Name</p>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  <span>Get help</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
