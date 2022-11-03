import React from "react";
import { Image } from "react-bootstrap";

interface Props {
  alt?: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholderImage: string;
  src: string;
}

export const LazyImage = ({
  alt,
  className,
  onError,
  placeholderImage,
  src,
}: Props) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleImageLoad = () => setLoaded(true);
  return (
    <React.Fragment>
      <Image
        alt={alt}
        className={`${className} ${loaded ? "" : "d-none"}`}
        onLoad={handleImageLoad}
        onError={onError}
        src={src}
      />
      <Image
        alt={"placeholder"}
        className={`${className} ${!loaded ? "" : "d-none"}`}
        src={placeholderImage}
      />
    </React.Fragment>
  );
};
