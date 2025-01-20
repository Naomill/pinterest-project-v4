import React from 'react';
import { Link2, MoreHorizontal } from 'lucide-react';

interface ShareMenuProps {
  url: string;
  onClose: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ url, onClose }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        break;
      case 'messenger':
        shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=550,height=450');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-sm mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Share</h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                <Link2 className="w-6 h-6" />
              </div>
              <span className="text-xs">Copy link</span>
            </button>
            
            <button
              onClick={() => handleShare('line')}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-[#00B900] rounded-full flex items-center justify-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </div>
              <span className="text-xs">LINE</span>
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="text-xs">WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleShare('messenger')}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-[#0099FF] rounded-full flex items-center justify-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                </svg>
              </div>
              <span className="text-xs">Messenger</span>
            </button>
          </div>
          
          <button
            className="w-full flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {}}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;