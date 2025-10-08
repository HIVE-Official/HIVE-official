"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, } from "../atoms/carousel.js";
import { cn } from "../../lib/utils.js";
const PhotoCarousel = React.forwardRef(({ className, photos, altPrefix = "Photo", aspectRatio = "portrait", ...props }, ref) => {
    const [api, setApi] = React.useState();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    // Limit to 5 photos max
    const displayPhotos = photos.slice(0, 5);
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
    const aspectRatioClass = {
        square: "aspect-square",
        portrait: "aspect-[4/5]", // Tinder-style portrait
        wide: "aspect-video",
    }[aspectRatio];
    return (_jsx("div", { ref: ref, className: cn("w-full", className), ...props, children: _jsxs(Carousel, { setApi: setApi, opts: { loop: true }, children: [_jsx(CarouselContent, { children: displayPhotos.map((photo, index) => (_jsx(CarouselItem, { children: _jsx("div", { className: cn("relative overflow-hidden rounded-2xl bg-muted", aspectRatioClass), children: _jsx("img", { src: photo, alt: `${altPrefix} ${index + 1}`, className: "h-full w-full object-cover" }) }) }, index))) }), count > 1 && (_jsx("div", { className: "absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10", children: Array.from({ length: count }).map((_, index) => (_jsx("button", { onClick: () => api?.scrollTo(index), className: cn("h-1 rounded-full transition-all", index === current
                            ? "w-8 bg-white"
                            : "w-1 bg-white/50 hover:bg-white/75"), "aria-label": `Go to photo ${index + 1}` }, index))) })), count > 1 && (_jsxs("div", { className: "absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium", children: [current + 1, " / ", count] }))] }) }));
});
PhotoCarousel.displayName = "PhotoCarousel";
export { PhotoCarousel };
//# sourceMappingURL=photo-carousel.js.map