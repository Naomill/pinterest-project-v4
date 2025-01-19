import React from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  MoreHorizontal,
  Image,
  Smile,
  Camera,
  Trash2,
} from 'lucide-react';
import { Pin } from '../types';

interface PinDetailProps {
  pin: Pin;
  onClose: () => void;
  onSave: () => void;
  onUnsave: () => void;
  isSaved: boolean;
  isCreatedByUser: boolean;
  onDelete: () => void;
}

const PinDetail: React.FC<PinDetailProps> = ({
  pin,
  onClose,
  onSave,
  onUnsave,
  isSaved,
  isCreatedByUser,
  onDelete,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src={pin.image}
              alt={pin.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Content */}
          <div className="p-8 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 size={24} />
                </button>
                {isCreatedByUser && (
                  <div className="relative">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <MoreHorizontal size={24} />
                    </button>
                    {showDropdown && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                        <button
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg flex items-center"
                          onClick={onDelete}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete Pin
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={isSaved ? onUnsave : onSave}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    isSaved
                      ? 'bg-black text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {pin.link && (
              <a
                href={pin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4 text-blue-600 hover:underline overflow-hidden overflow-ellipsis"
              >
                {pin.link}
              </a>
            )}

            <h1 className="text-3xl font-bold mb-4">{pin.title}</h1>

            {pin.description && (
              <p className="text-gray-600 mb-6">{pin.description}</p>
            )}

            <div className="flex items-center space-x-2 mb-6">
              <button className="flex items-center space-x-1">
                <Heart size={20} />
                <span>91</span>
              </button>
            </div>

            {/* Comments section */}
            <div className="border-t pt-6">
              <h2 className="font-semibold mb-4">What do you think?</h2>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-3">
                <input
                  type="text"
                  placeholder="Add a comment to start the conversation"
                  className="flex-1 bg-transparent outline-none"
                />
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <Smile size={20} />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <Camera size={20} />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <Image size={20} />
                </button>
              </div>
            </div>

            {/* More to explore section */}
            <div className="mt-8">
              <h2 className="font-semibold mb-4">More to explore</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'https://i.pinimg.com/736x/3c/ef/ba/3cefba42a08e5c3e537de390f617a81d.jpg',
                  'https://i.pinimg.com/736x/89/a3/5d/89a35ddd08ea54bd979e8a1182805ad6.jpg',
                  'https://i.pinimg.com/736x/64/69/d2/6469d2357b7c385db9dd7ab0ec5d53ea.jpg',
                  'https://i.pinimg.com/736x/22/ab/bb/22abbb310ab3cc40f81918a37d557903.jpg',
                ].map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrl}
                      alt={`Related pin ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
