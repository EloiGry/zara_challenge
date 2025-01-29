'use client';

import React, { useCallback, useEffect, useState } from 'react';

import './carousel.css';

import clsx from 'clsx';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselProps {
  options?: EmblaOptionsType;
  showProgressBar?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function Carousel({
  options,
  showProgressBar = true,
  className,
  children,
}: Readonly<CarouselProps>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('scroll', () => onScroll(emblaApi));
    emblaApi.on('reInit', () => onScroll(emblaApi));
    onScroll(emblaApi);
  }, [emblaApi, onScroll]);

  return (
    <>
      <div className={clsx(className, 'embla')}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{children}</div>
        </div>
      </div>
      {showProgressBar && (
        <div data-testid="progress-bar">
          <ProgressBar progress={scrollProgress} />
        </div>
      )}
    </>
  );
}

export function CarouselSlide({ children, className }: Readonly<CarouselSlideProps>) {
  return <div className={clsx('embla__slide', className)}>{children}</div>;
}

export function ProgressBar({ progress, className }: Readonly<ProgressBarProps>) {
  return (
    <div className={clsx('embla__controls', className)}>
      <div className="embla__progress">
        <div
          className="embla__progress__bar"
          style={{ transform: `translate3d(${progress}%, 0, 0)` }}
        />
      </div>
    </div>
  );
}
