"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Carousel, CarouselContent, CarouselItem, } from "../atoms/carousel";
import { cn } from "../../lib/utils";
const ProfileHeader = React.forwardRef(({ className, name, handle, avatarUrl, photos, bio, major, academicYear, graduationYear, pronouns, verified = false, isOwnProfile = false, isConnected = false, badges = [], onConnect, onMessage, onEdit, ...props }, ref) => {
    // Generate initials from name
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    // Carousel state for swipeable photos
    const [api, setApi] = React.useState();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    // Limit to 5 photos max (HIVE spec)
    const displayPhotos = photos?.slice(0, 5);
    const hasMultiplePhotos = displayPhotos && displayPhotos.length > 1;
    React.useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);
    return (_jsxs("div", { ref: ref, className: cn("space-y-6", className), ...props, children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [hasMultiplePhotos ? (
                    // Swipeable avatar carousel
                    _jsx("div", { className: "w-60 shrink-0 mx-auto sm:mx-0", children: _jsxs(Carousel, { setApi: setApi, opts: { loop: true }, children: [_jsx(CarouselContent, { children: displayPhotos.map((photo, index) => (_jsx(CarouselItem, { children: _jsx("div", { className: "h-80 w-60 rounded-3xl border-4 border-border shadow-2xl overflow-hidden bg-muted", children: _jsx("img", { src: photo, alt: `${name} - Photo ${index + 1}`, className: "h-full w-full object-cover" }) }) }, index))) }), count > 1 && (_jsx("div", { className: "absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10", children: Array.from({ length: count }).map((_, index) => (_jsx("button", { onClick: () => api?.scrollTo(index), className: cn("h-1 rounded-full transition-all", index === current
                                            ? "w-8 bg-white shadow-md"
                                            : "w-1 bg-white/50 hover:bg-white/75"), "aria-label": `Go to photo ${index + 1}` }, index))) })), count > 1 && (_jsxs("div", { className: "absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium", children: [current + 1, " / ", count] }))] }) })) : (
                    // Single avatar (fallback)
                    _jsxs(Avatar, { className: "h-80 w-60 rounded-3xl border-4 border-border shadow-2xl shrink-0 mx-auto sm:mx-0", children: [_jsx(AvatarImage, { src: avatarUrl || displayPhotos?.[0], alt: name, className: "object-cover" }), _jsx(AvatarFallback, { className: "rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 text-5xl font-bold text-primary", children: initials })] })), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsx("h1", { className: "text-3xl font-bold text-foreground", children: name }), verified && (_jsx("svg", { className: "h-6 w-6 shrink-0 text-primary", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }) }))] }), _jsxs("div", { className: "mt-1 flex items-center gap-2 text-muted-foreground", children: [_jsxs("span", { children: ["@", handle] }), pronouns && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: pronouns })] }))] }), (major || academicYear || graduationYear) && (_jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-sm", children: [major && (_jsx("span", { className: "text-foreground font-medium", children: major })), major && (academicYear || graduationYear) && (_jsx("span", { className: "text-muted-foreground", children: "\u2022" })), academicYear && (_jsx("span", { className: "text-muted-foreground", children: academicYear })), graduationYear && (_jsxs("span", { className: "text-muted-foreground", children: ["Class of ", graduationYear] }))] }))] }), _jsx("div", { className: "flex flex-wrap gap-2", children: isOwnProfile ? (_jsxs(Button, { onClick: onEdit, variant: "outline", children: [_jsx("svg", { className: "mr-2 h-4 w-4", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }), "Edit Profile"] })) : (_jsx(_Fragment, { children: isConnected ? (_jsxs(Button, { onClick: onMessage, variant: "default", children: [_jsx("svg", { className: "mr-2 h-4 w-4", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" }) }), "Message"] })) : (_jsxs(Button, { onClick: onConnect, variant: "default", children: [_jsx("svg", { className: "mr-2 h-4 w-4", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" }) }), "Connect"] })) })) })] })] }), bio && (_jsx("p", { className: "text-base text-muted-foreground leading-relaxed max-w-2xl", children: bio })), badges.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: badges.map((badge, index) => (_jsx(Badge, { variant: badge.variant || "secondary", children: badge.label }, index))) }))] }));
});
ProfileHeader.displayName = "ProfileHeader";
export { ProfileHeader };
//# sourceMappingURL=profile-header.js.map