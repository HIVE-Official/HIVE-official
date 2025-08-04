import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef } from 'react';

const meta = {
  title: 'Settings/01-Profile Settings/AvatarUploader',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar upload and management system with cropping, positioning, and emoji fallback options'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface Avatar {
  type: 'photo' | 'emoji' | 'initials';
  url?: string;
  emoji?: string;
  initials?: string;
  position?: { x: number; y: number };
  scale?: number;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Demo data
const INITIAL_AVATAR: Avatar = {
  type: 'photo',
  url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
  position: { x: 0, y: 0 },
  scale: 1
};

const EMOJI_OPTIONS = [
  '😊', '😎', '🤓', '😄', '😁', '🙂', '😇', '🥳', 
  '🤔', '😴', '🤯', '🥴', '😋', '😍', '🤪', '😜',
  '👩‍💻', '👨‍💻', '👩‍🎓', '👨‍🎓', '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨',
  '🦄', '🐱', '🐶', '🐻', '🐼', '🦊', '🐸', '🐙'
];

// Avatar Display Component
const AvatarDisplay: React.FC<{
  avatar: Avatar;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ avatar, size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
    xl: 'w-32 h-32 text-5xl'
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center ${className}`;

  if (avatar.type === 'photo' && avatar.url) {
    return (
      <div className={`${baseClasses} overflow-hidden bg-hive-background-primary border-2 border-white shadow-lg`}>
        <img
          src={avatar.url}
          alt="Profile avatar"
          className="w-full h-full object-cover"
          style={{
            transform: `translate(${avatar.position?.x || 0}px, ${avatar.position?.y || 0}px) scale(${avatar.scale || 1})`,
            transformOrigin: 'center'
          }}
        />
      </div>
    );
  }

  if (avatar.type === 'emoji' && avatar.emoji) {
    return (
      <div className={`${baseClasses} bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary text-white shadow-lg`}>
        <span className="select-none">{avatar.emoji}</span>
      </div>
    );
  }

  if (avatar.type === 'initials' && avatar.initials) {
    return (
      <div className={`${baseClasses} bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold shadow-lg`}>
        <span className="select-none">{avatar.initials}</span>
      </div>
    );
  }

  // Fallback
  return (
    <div className={`${baseClasses} bg-hive-background-primary border-2 border-hive-border-default text-hive-text-secondary`}>
      <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

// Photo Cropper Component
const PhotoCropper: React.FC<{
  imageUrl: string;
  onCrop: (avatar: Avatar) => void;
  onCancel: () => void;
}> = ({ imageUrl, onCrop, onCancel }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    onCrop({
      type: 'photo',
      url: imageUrl,
      position,
      scale
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-hive-text-primary mb-6">Adjust Your Photo</h3>
        
        {/* Crop Preview */}
        <div className="relative w-64 h-64 mx-auto mb-6 bg-hive-background-primary rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Crop preview"
            className="absolute inset-0 w-full h-full object-cover cursor-move select-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            draggable={false}
          />
        </div>

        {/* Scale Control */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-hive-text-primary mb-2">
            Zoom: {Math.round(scale * 100)}%
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Instructions */}
        <div className="text-sm text-hive-text-secondary mb-6 text-center">
          Drag the image to reposition • Use the slider to zoom
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  );
};

// Emoji Picker Component
const EmojiPicker: React.FC<{
  onSelect: (emoji: string) => void;
  onCancel: () => void;
}> = ({ onSelect, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-hive-text-primary mb-6">Choose an Emoji</h3>
        
        <div className="grid grid-cols-8 gap-2 mb-6 max-h-64 overflow-y-auto">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSelect(emoji)}
              className="w-10 h-10 text-2xl hover:bg-hive-background-primary rounded-lg transition-colors flex items-center justify-center"
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Avatar Uploader Component
const AvatarUploader: React.FC = () => {
  const [avatar, setAvatar] = useState<Avatar>(INITIAL_AVATAR);
  const [showCropper, setShowCropper] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setTempImageUrl(imageUrl);
      setShowCropper(true);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = (croppedAvatar: Avatar) => {
    setAvatar(croppedAvatar);
    setShowCropper(false);
    setTempImageUrl('');
  };

  const handleEmojiSelect = (emoji: string) => {
    setAvatar({
      type: 'emoji',
      emoji
    });
    setShowEmojiPicker(false);
  };

  const handleUseInitials = () => {
    const initials = 'SJ'; // In real app, derive from user's name
    setAvatar({
      type: 'initials',
      initials
    });
  };

  const handleRemoveAvatar = () => {
    setAvatar({
      type: 'initials',
      initials: 'SJ'
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-hive-border-default p-8">
        <div className="text-center space-y-6">
          {/* Current Avatar Display */}
          <div className="flex justify-center">
            <div className="relative">
              <AvatarDisplay avatar={avatar} size="xl" />
              
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-hive-status-success rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-hive-text-primary mb-2">Profile Photo</h3>
            <p className="text-hive-text-secondary text-sm">
              Upload a photo, choose an emoji, or use your initials
            </p>
          </div>

          {/* Avatar Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePhotoUpload}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 p-3 border border-hive-border-default rounded-lg hover:border-hive-brand-primary hover:bg-hive-background-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Upload Photo</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowEmojiPicker(true)}
              className="flex items-center justify-center gap-2 p-3 border border-hive-border-default rounded-lg hover:border-hive-brand-primary hover:bg-hive-background-primary transition-colors"
            >
              <span className="text-lg">😊</span>
              <span className="text-sm">Choose Emoji</span>
            </button>

            <button
              onClick={handleUseInitials}
              className="flex items-center justify-center gap-2 p-3 border border-hive-border-default rounded-lg hover:border-hive-brand-primary hover:bg-hive-background-primary transition-colors"
            >
              <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                SJ
              </div>
              <span className="text-sm">Use Initials</span>
            </button>

            <button
              onClick={handleRemoveAvatar}
              className="flex items-center justify-center gap-2 p-3 border border-hive-border-default rounded-lg hover:border-hive-status-error hover:bg-red-50 hover:text-hive-status-error transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Remove</span>
            </button>
          </div>

          {/* Current Avatar Info */}
          <div className="p-4 bg-hive-background-primary rounded-xl">
            <div className="text-sm text-hive-text-secondary">
              Current avatar: <span className="font-medium text-hive-text-primary capitalize">{avatar.type}</span>
              {avatar.type === 'photo' && ' • Click to adjust positioning'}
              {avatar.type === 'emoji' && ` • ${avatar.emoji}`}
              {avatar.type === 'initials' && ` • ${avatar.initials}`}
            </div>
          </div>

          {/* Tips */}
          <div className="text-xs text-hive-text-secondary space-y-1">
            <div>• Photos should be at least 200x200 pixels</div>
            <div>• Maximum file size: 5MB</div>
            <div>• Supported formats: JPG, PNG, GIF</div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Photo Cropper Modal */}
      {showCropper && tempImageUrl && (
        <PhotoCropper
          imageUrl={tempImageUrl}
          onCrop={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setTempImageUrl('');
            setIsUploading(false);
          }}
        />
      )}

      {/* Emoji Picker Modal */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          onCancel={() => setShowEmojiPicker(false)}
        />
      )}

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-hive-border-default">
        <h4 className="font-bold text-hive-text-primary mb-4">Preview in Different Sizes</h4>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <AvatarDisplay avatar={avatar} size="sm" />
            <div className="text-xs text-hive-text-secondary mt-2">Small</div>
          </div>
          <div className="text-center">
            <AvatarDisplay avatar={avatar} size="md" />
            <div className="text-xs text-hive-text-secondary mt-2">Medium</div>
          </div>
          <div className="text-center">
            <AvatarDisplay avatar={avatar} size="lg" />
            <div className="text-xs text-hive-text-secondary mt-2">Large</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicAvatarUploader: Story = {
  name: '🖼️ Basic Avatar Uploader',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <AvatarUploader />
      </div>
    );
  }
};

export const PhotoAvatarExample: Story = {
  name: '📸 Photo Avatar Example',
  render: () => {
    const photoAvatar: Avatar = {
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      position: { x: 0, y: 0 },
      scale: 1.2
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8 flex items-center justify-center">
        <div className="text-center space-y-6">
          <AvatarDisplay avatar={photoAvatar} size="xl" />
          <div className="text-hive-text-primary">Photo Avatar with Custom Positioning</div>
        </div>
      </div>
    );
  }
};

export const EmojiAvatarExample: Story = {
  name: '😊 Emoji Avatar Example',
  render: () => {
    const emojiAvatar: Avatar = {
      type: 'emoji',
      emoji: '👩‍💻'
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8 flex items-center justify-center">
        <div className="text-center space-y-6">
          <AvatarDisplay avatar={emojiAvatar} size="xl" />
          <div className="text-hive-text-primary">Emoji Avatar Example</div>
        </div>
      </div>
    );
  }
};

export const InitialsAvatarExample: Story = {
  name: '📝 Initials Avatar Example',
  render: () => {
    const initialsAvatar: Avatar = {
      type: 'initials',
      initials: 'SJ'
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8 flex items-center justify-center">
        <div className="text-center space-y-6">
          <AvatarDisplay avatar={initialsAvatar} size="xl" />
          <div className="text-hive-text-primary">Initials Avatar Example</div>
        </div>
      </div>
    );
  }
};