import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  sizes?: string;
  style?: React.CSSProperties;
}

// Mock Next.js Image component for Storybook
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  fill,
  ...props
}) => {
  const imgStyle: React.CSSProperties = {
    ...style,
    ...(fill ? { objectFit: "cover", width: "100%", height: "100%" } : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
      {...props}
    />
  );
};

export default Image;
