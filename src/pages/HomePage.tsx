import React, { useState } from 'react';
import { MoreHorizontal, Share2, ExternalLink, Trash2 } from 'lucide-react';
import { usePins } from '../context/PinContext';
import PinDetail from '../components/PinDetail';
import ShareMenu from '../components/ShareMenu';
import { Pin } from '../types';

const HomePage = () => {
  const { pins, user, savePin, unsavePin, deletePin } = usePins();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin);
  };

  const handleSave = (e: React.MouseEvent, pinId: string) => {
    e.stopPropagation();
    if (user.savedPins.includes(pinId)) {
      unsavePin(pinId);
    } else {
      savePin(pinId);
    }
  };

  const handleDelete = (e: React.MouseEvent, pinId: string) => {
    e.stopPropagation();
    deletePin(pinId);
    setShowDropdown(null);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(true);
  };

  return (
    <>
      <div className="max-w-[2000px] mx-auto px-4 py-8">
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="mb-4 break-inside-avoid"
              onClick={() => handlePinClick(pin)}
            >
              <div className="relative group cursor-zoom-in">
                <img
                  src={pin.image}
                  alt={pin.title}
                  className="w-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl">
                  <div
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      className="p-2 bg-white rounded-full hover:bg-gray-100 mr-2"
                      onClick={handleShare}
                    >
                      <Share2 size={20} />
                    </button>
                    <div className="relative inline-block">
                      <button
                        className="p-2 bg-white rounded-full hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdown(showDropdown === pin.id ? null : pin.id);
                        }}
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {showDropdown === pin.id && pin.createdBy === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                          <button
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg flex items-center"
                            onClick={(e) => handleDelete(e, pin.id)}
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete Pin
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`absolute bottom-2 left-2 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold ${
                      user.savedPins.includes(pin.id)
                        ? 'bg-black text-white'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    onClick={(e) => handleSave(e, pin.id)}
                  >
                    {user.savedPins.includes(pin.id) ? 'Saved' : 'Save'}
                  </button>
                  {pin.link && (
                    <button
                      className="absolute bottom-2 right-2 p-2 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} />
                    </button>
                  )}
                </div>
              </div>
              {/* {pin.title && (
                <h3 className="mt-2 font-medium text-sm">{pin.title}</h3>
              )}
              {pin.description && (
                <p className="text-sm text-gray-500">{pin.description}</p>
              )} */}
            </div>
          ))}
        </div>
      </div>

      {selectedPin && (
        <PinDetail
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onSave={() => savePin(selectedPin.id)}
          onUnsave={() => unsavePin(selectedPin.id)}
          isSaved={user.savedPins.includes(selectedPin.id)}
          isCreatedByUser={selectedPin.createdBy === user.id}
          onDelete={() => {
            deletePin(selectedPin.id);
            setSelectedPin(null);
          }}
        />
      )}

      {showShareMenu && (
        <ShareMenu
          url={window.location.href}
          onClose={() => setShowShareMenu(false)}
        />
      )}
    </>
  );
};

export default HomePage;