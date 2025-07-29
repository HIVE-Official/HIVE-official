import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, FileText, Download, Share2, BookmarkPlus, Eye, Heart, MessageSquare, MoreHorizontal, ChevronLeft, ChevronRight, ZoomIn, File, Video, Music, Image, MapPin, Clock } from 'lucide-react';
// HIVE Media Molecules - Campus Content Handling
const meta = {
    title: 'Molecules/🎬 Media Content',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**HIVE Media Molecules** - Campus content handling with dense responsive layouts

Brand-compliant media display patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that handle campus media content across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for media controls and highlights
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for media backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for media text
- **Zero Non-Brand Colors**: No blues, greens, reds for media interfaces

## Dense Media Patterns
- **Compact Players**: Maximum functionality in minimal space
- **Touch-Friendly**: Media controls optimized for mobile interaction
- **Campus Context**: Media types relevant to university content
- **Quick Actions**: Frequently used media actions prominently placed

## Campus Media Types
- Lecture recordings and academic videos
- Campus event photos and galleries
- Student-created content and portfolios
- Study materials and document sharing
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Video Player - Lecture and Campus Content
const CampusVideoPlayer = ({ title = 'CS 106B: Recursion and Backtracking - Lecture 15', duration = '1:23:45', currentTime = '18:32', isPlaying = false, isMuted = false, views = 234, likes = 67, thumbnail = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', course = 'CS 106B', professor = 'Prof. Roberts', onPlay = () => { }, onMute = () => { }, onFullscreen = () => { } }) => {
    const progress = 23; // Mock progress percentage
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg overflow-hidden", children: [_jsxs("div", { className: "relative aspect-video bg-obsidian group", children: [_jsx("img", { src: thumbnail, alt: title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-obsidian/60 flex items-center justify-center group-hover:bg-obsidian/40 transition-colors", children: _jsx("button", { onClick: onPlay, className: "w-16 h-16 bg-gold/90 hover:bg-gold rounded-full flex items-center justify-center transition-all hover:scale-105", children: isPlaying ? (_jsx(Pause, { className: "h-8 w-8 text-obsidian ml-0" })) : (_jsx(Play, { className: "h-8 w-8 text-obsidian ml-1" })) }) }), _jsx("div", { className: "absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-2 py-1 rounded", children: duration }), _jsx("div", { className: "absolute top-2 left-2 bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded", children: course })] }), _jsx("div", { className: "h-1 bg-steel", children: _jsx("div", { className: "h-full bg-gold transition-all duration-300", style: { width: `${progress}%` } }) }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { onClick: onPlay, className: "text-gold hover:text-champagne", children: isPlaying ? _jsx(Pause, { className: "h-5 w-5" }) : _jsx(Play, { className: "h-5 w-5" }) }), _jsx("button", { onClick: onMute, className: "text-silver hover:text-platinum", children: isMuted ? _jsx(VolumeX, { className: "h-5 w-5" }) : _jsx(Volume2, { className: "h-5 w-5" }) }), _jsxs("span", { className: "text-sm text-silver", children: [currentTime, " / ", duration] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "text-silver hover:text-gold", children: _jsx(Share2, { className: "h-4 w-4" }) }), _jsx("button", { className: "text-silver hover:text-gold", children: _jsx(BookmarkPlus, { className: "h-4 w-4" }) }), _jsx("button", { onClick: onFullscreen, className: "text-silver hover:text-platinum", children: _jsx(Maximize, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-semibold text-platinum line-clamp-2", children: title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-silver", children: [_jsx("span", { children: professor }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsx("span", { children: views })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Heart, { className: "h-3 w-3" }), _jsx("span", { children: likes })] })] })] })] })] })] }));
};
// Document Viewer - Study Materials and Resources  
const CampusDocumentViewer = ({ title = 'CS 106B Assignment 4: Recursion Problems', type = 'pdf', pages = 12, currentPage = 1, size = '2.4 MB', uploadedBy = 'Prof. Roberts', downloadCount = 89, course = 'CS 106B', onDownload = () => { }, onShare = () => { }, onBookmark = () => { } }) => {
    const getTypeIcon = () => {
        switch (type) {
            case 'pdf': return FileText;
            case 'doc': return File;
            case 'slides': return Image;
            default: return FileText;
        }
    };
    const TypeIcon = getTypeIcon();
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg overflow-hidden", children: [_jsxs("div", { className: "aspect-[3/4] bg-graphite flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-obsidian border-b border-steel", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-1 rounded hover:bg-charcoal", children: _jsx(ChevronLeft, { className: "h-4 w-4 text-silver" }) }), _jsxs("span", { className: "text-xs text-silver", children: [currentPage, " / ", pages] }), _jsx("button", { className: "p-1 rounded hover:bg-charcoal", children: _jsx(ChevronRight, { className: "h-4 w-4 text-silver" }) })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("button", { className: "p-1 rounded hover:bg-charcoal", children: _jsx(ZoomIn, { className: "h-4 w-4 text-silver" }) }), _jsx("button", { className: "p-1 rounded hover:bg-charcoal", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-silver" }) })] })] }), _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(TypeIcon, { className: "h-16 w-16 text-gold mx-auto mb-4" }), _jsxs("div", { className: "text-sm text-platinum font-medium mb-1", children: [type.toUpperCase(), " Document"] }), _jsx("div", { className: "text-xs text-silver", children: "Click to view full document" })] }) })] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-semibold text-platinum line-clamp-2 mb-1", children: title }), _jsxs("div", { className: "text-xs text-silver", children: [uploadedBy, " \u2022 ", size, " \u2022 ", pages, " pages"] })] }), _jsx("div", { className: "bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded ml-2", children: course })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("button", { onClick: onDownload, className: "flex items-center space-x-1 text-gold hover:text-champagne", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs font-medium", children: downloadCount })] }), _jsx("button", { onClick: onShare, className: "text-silver hover:text-platinum", children: _jsx(Share2, { className: "h-4 w-4" }) }), _jsx("button", { onClick: onBookmark, className: "text-silver hover:text-gold", children: _jsx(BookmarkPlus, { className: "h-4 w-4" }) })] }), _jsx("button", { className: "bg-gold text-obsidian text-xs font-semibold px-3 py-1 rounded hover:bg-champagne transition-colors", children: "Open" })] })] })] }));
};
// Image Gallery - Campus Events and Photos
const CampusImageGallery = ({ images = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        caption: 'HCI Club Design Thinking Workshop',
        likes: 23,
        comments: 5
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop',
        caption: 'Students collaborating on UI mockups',
        likes: 18,
        comments: 3
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        caption: 'Final presentation and demos',
        likes: 31,
        comments: 8
    }
], event = 'HCI Club Design Thinking Workshop', date = '2 days ago', location = 'd.school', photographer = 'Sarah Kim', totalImages = 24 }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg overflow-hidden", children: [_jsxs("div", { className: "relative aspect-[4/3] bg-obsidian", children: [_jsx("img", { src: images[currentIndex]?.url, alt: images[currentIndex]?.caption, className: "w-full h-full object-cover" }), images.length > 1 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setCurrentIndex(Math.max(0, currentIndex - 1)), className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-obsidian/70 hover:bg-obsidian/90 rounded-full flex items-center justify-center transition-colors", disabled: currentIndex === 0, children: _jsx(ChevronLeft, { className: `h-5 w-5 ${currentIndex === 0 ? 'text-pewter' : 'text-platinum'}` }) }), _jsx("button", { onClick: () => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1)), className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-obsidian/70 hover:bg-obsidian/90 rounded-full flex items-center justify-center transition-colors", disabled: currentIndex === images.length - 1, children: _jsx(ChevronRight, { className: `h-5 w-5 ${currentIndex === images.length - 1 ? 'text-pewter' : 'text-platinum'}` }) })] })), _jsxs("div", { className: "absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-2 py-1 rounded", children: [currentIndex + 1, " / ", totalImages] }), _jsx("div", { className: "absolute top-2 left-2 bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded", children: "Event" })] }), _jsx("div", { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-platinum mb-1", children: event }), _jsx("p", { className: "text-xs text-silver line-clamp-2", children: images[currentIndex]?.caption })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-silver", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: location })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: date })] })] }), _jsxs("span", { children: ["by ", photographer] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("button", { className: "flex items-center space-x-1 text-silver hover:text-gold", children: [_jsx(Heart, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: images[currentIndex]?.likes })] }), _jsxs("button", { className: "flex items-center space-x-1 text-silver hover:text-platinum", children: [_jsx(MessageSquare, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: images[currentIndex]?.comments })] }), _jsx("button", { className: "text-silver hover:text-platinum", children: _jsx(Share2, { className: "h-4 w-4" }) })] }), _jsxs("button", { className: "text-xs text-gold hover:text-champagne font-medium", children: ["View All ", totalImages] })] })] }) }), images.length > 1 && (_jsx("div", { className: "border-t border-steel p-2", children: _jsx("div", { className: "flex space-x-2 overflow-x-auto", children: images.map((image, index) => (_jsx("button", { onClick: () => setCurrentIndex(index), className: `flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${index === currentIndex ? 'border-gold' : 'border-steel hover:border-silver'}`, children: _jsx("img", { src: image.url, alt: image.caption, className: "w-full h-full object-cover" }) }, image.id))) }) }))] }));
};
// Audio Player - Podcast and Lecture Audio
const CampusAudioPlayer = ({ title = 'CS 106B: Understanding Recursion', artist = 'Prof. Roberts', duration = '45:32', currentTime = '12:18', isPlaying = false, course = 'CS 106B', episode = 'Lecture 15 Audio', onPlay = () => { }, onSkipBack = () => { }, onSkipForward = () => { } }) => {
    const progress = 27; // Mock progress percentage
    return (_jsx("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-graphite rounded-lg flex items-center justify-center flex-shrink-0", children: _jsx(Music, { className: "h-8 w-8 text-gold" }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-platinum truncate", children: title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-silver", children: [_jsxs("span", { children: [artist, " \u2022 ", episode] }), _jsx("span", { className: "bg-gold text-obsidian px-2 py-0.5 rounded font-semibold", children: course })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "w-full bg-steel rounded-full h-1", children: _jsx("div", { className: "bg-gold h-1 rounded-full transition-all duration-300", style: { width: `${progress}%` } }) }), _jsxs("div", { className: "flex justify-between text-xs text-silver", children: [_jsx("span", { children: currentTime }), _jsx("span", { children: duration })] })] }), _jsxs("div", { className: "flex items-center justify-center space-x-4", children: [_jsx("button", { onClick: onSkipBack, className: "text-silver hover:text-platinum", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }), _jsx("button", { onClick: onPlay, className: "w-10 h-10 bg-gold hover:bg-champagne rounded-full flex items-center justify-center transition-colors", children: isPlaying ? (_jsx(Pause, { className: "h-5 w-5 text-obsidian" })) : (_jsx(Play, { className: "h-5 w-5 text-obsidian ml-0.5" })) }), _jsx("button", { onClick: onSkipForward, className: "text-silver hover:text-platinum", children: _jsx(ChevronRight, { className: "h-5 w-5" }) })] })] }) })] }) }));
};
// Media Grid - Campus Content Overview
const CampusMediaGrid = ({ mediaItems = [
    {
        id: '1',
        type: 'video',
        title: 'CS 106B Lecture 15: Recursion',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
        duration: '1:23:45',
        course: 'CS 106B',
        views: 234,
        date: '2 days ago'
    },
    {
        id: '2',
        type: 'document',
        title: 'Assignment 4: Recursion Problems',
        thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop',
        course: 'CS 106B',
        views: 89,
        date: '1 week ago'
    },
    {
        id: '3',
        type: 'image',
        title: 'HCI Workshop Photos',
        thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop',
        course: 'HCI Club',
        views: 156,
        date: '3 days ago'
    },
    {
        id: '4',
        type: 'audio',
        title: 'Study Tips Podcast',
        thumbnail: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop',
        duration: '32:18',
        course: 'Study Tips',
        views: 67,
        date: '5 days ago'
    }
] }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return Video;
            case 'audio': return Music;
            case 'document': return FileText;
            case 'image': return Image;
            default: return File;
        }
    };
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-semibold text-platinum", children: "Campus Media" }), _jsx("button", { className: "text-xs text-gold hover:text-champagne font-medium", children: "View All" })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: mediaItems.map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (_jsxs("div", { className: "bg-graphite rounded-lg overflow-hidden hover:bg-slate transition-colors cursor-pointer", children: [_jsxs("div", { className: "relative aspect-video", children: [_jsx("img", { src: item.thumbnail, alt: item.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute top-2 left-2 w-6 h-6 bg-obsidian/80 rounded flex items-center justify-center", children: _jsx(TypeIcon, { className: "h-3 w-3 text-gold" }) }), item.duration && (_jsx("div", { className: "absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-1 py-0.5 rounded", children: item.duration })), _jsx("div", { className: "absolute top-2 right-2 bg-gold text-obsidian text-xs font-semibold px-1 py-0.5 rounded", children: item.course })] }), _jsxs("div", { className: "p-2", children: [_jsx("h4", { className: "text-xs font-medium text-platinum line-clamp-2 mb-1", children: item.title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-silver", children: [_jsxs("span", { children: [item.views, " views"] }), _jsx("span", { children: item.date })] })] })] }, item.id));
                }) })] }));
};
// Stories
export const CampusLectureVideo = {
    name: '🎥 Campus Lecture Video',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CampusVideoPlayer, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx(Video, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Lecture Recordings" }), _jsx("p", { className: "text-sm text-silver", children: "Campus video player optimized for academic content with course branding and engagement metrics" })] })] }) }))
};
export const StudyMaterialDocuments = {
    name: '📄 Study Material Viewer',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CampusDocumentViewer, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx(FileText, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Academic Documents" }), _jsx("p", { className: "text-sm text-silver", children: "Document viewer for assignments, handouts, and study materials with download tracking" })] })] }) }))
};
export const CampusEventGallery = {
    name: '📸 Campus Event Gallery',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CampusImageGallery, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx(Image, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Event Photos" }), _jsx("p", { className: "text-sm text-silver", children: "Interactive image gallery for campus events with engagement metrics and thumbnail navigation" })] })] }) }))
};
export const LectureAudioPlayer = {
    name: '🎵 Lecture Audio Player',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CampusAudioPlayer, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx(Music, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Audio Content" }), _jsx("p", { className: "text-sm text-silver", children: "Compact audio player for lecture recordings and educational podcasts with course branding" })] })] }) }))
};
export const CampusMediaOverview = {
    name: '📱 Campus Media Grid',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CampusMediaGrid, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx(File, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Media Library" }), _jsx("p", { className: "text-sm text-silver", children: "Dense grid layout for browsing campus media content across different types and courses" })] })] }) }))
};
export const DenseMobileMediaHub = {
    name: '📱 Dense Mobile Media Hub',
    render: () => (_jsx("div", { className: "bg-obsidian p-4 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto space-y-4", children: [_jsx(CampusVideoPlayer, {}), _jsx(CampusAudioPlayer, {}), _jsx(CampusMediaGrid, {}), _jsxs("div", { className: "bg-charcoal rounded-lg p-4 text-center", children: [_jsx(Video, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Complete Media System" }), _jsx("p", { className: "text-sm text-silver", children: "Dense mobile layout showcasing all campus media types in a compact, touch-friendly interface" })] })] }) })),
    parameters: {
        viewport: { defaultViewport: 'mobile2' }
    }
};
export const ResponsiveMediaGrid = {
    name: '📐 Responsive Media Layout',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsx(CampusVideoPlayer, {}), _jsx(CampusDocumentViewer, {}), _jsx(CampusImageGallery, {}), _jsx("div", { className: "md:col-span-2 lg:col-span-1", children: _jsx(CampusAudioPlayer, {}) }), _jsx("div", { className: "md:col-span-2", children: _jsx(CampusMediaGrid, {}) })] }), _jsxs("div", { className: "mt-8 bg-charcoal rounded-lg p-6 text-center", children: [_jsx(Video, { className: "h-12 w-12 text-gold mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-platinum mb-4", children: "Campus Media Ecosystem" }), _jsx("p", { className: "text-silver max-w-2xl mx-auto", children: "Comprehensive responsive media system that adapts from single-column mobile to three-column desktop, maintaining media clarity and interaction design across all screen sizes" })] })] }) }))
};
//# sourceMappingURL=hive-media-molecules.stories.js.map