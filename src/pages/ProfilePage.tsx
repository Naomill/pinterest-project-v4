import React, { useState } from 'react';
import { usePins } from '../context/PinContext';
import { Pin } from '../types';
import PinDetail from '../components/PinDetail';

const ProfilePage = () => {
  const { user, savePin, unsavePin, deletePin, getSavedPins, getCreatedPins } = usePins();
  const [activeTab, setActiveTab] = useState<'saved' | 'created'>('saved');
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const pins = activeTab === 'saved' ? getSavedPins() : getCreatedPins();

  return (
    <div className="max-w-[2000px] mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === 'saved'
              ? 'bg-black text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('saved')}
        >
          Your saved
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === 'created'
              ? 'bg-black text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('created')}
        >
          Your pins
        </button>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="mb-4 break-inside-avoid cursor-pointer"
            onClick={() => setSelectedPin(pin)}
          >
            <div className="relative group">
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl" />
            </div>
            {pin.title && (
              <h3 className="mt-2 font-medium text-sm">{pin.title}</h3>
            )}
          </div>
        ))}
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
    </div>
  );
};

export default ProfilePage;