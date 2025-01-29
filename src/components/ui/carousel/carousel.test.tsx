import { render, screen } from '@testing-library/react';

import { Carousel, CarouselSlide } from './carousel';

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue([
    { current: null },
    {
      canScrollNext: jest.fn().mockReturnValue(true),
      canScrollPrev: jest.fn().mockReturnValue(true),
      containerNode: jest.fn(),
      internalEngine: jest.fn(),
      destroy: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
      emit: jest.fn(),
      plugins: jest.fn(),
      previousScrollSnap: jest.fn(),
      reInit: jest.fn(),
      rootNode: jest.fn(),
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      scrollProgress: jest.fn(),
      scrollSnapList: jest.fn(),
      scrollTo: jest.fn(),
      selectedScrollSnap: jest.fn(),
      slideNodes: jest.fn(),
      slidesInView: jest.fn(),
      slidesNotInView: jest.fn(),
    },
  ]),
}));

describe('Carousel Component', () => {
  it('should render Carousel and show the progress bar when showProgressBar is true', () => {
    render(
      <Carousel showProgressBar={true}>
        <CarouselSlide>Slide 1</CarouselSlide>
        <CarouselSlide>Slide 2</CarouselSlide>
        <CarouselSlide>Slide 3</CarouselSlide>
      </Carousel>
    );

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('should not render the progress bar when showProgressBar is false', () => {
    render(
      <Carousel showProgressBar={false}>
        <CarouselSlide>Slide 1</CarouselSlide>
        <CarouselSlide>Slide 2</CarouselSlide>
        <CarouselSlide>Slide 3</CarouselSlide>
      </Carousel>
    );

    const progressBar = screen.queryByTestId('progress-bar');
    expect(progressBar).toBeNull();
  });
  it('should render the correct number of slides', () => {
    render(
      <Carousel showProgressBar={true}>
        <CarouselSlide>Slide 1</CarouselSlide>
        <CarouselSlide>Slide 2</CarouselSlide>
        <CarouselSlide>Slide 3</CarouselSlide>
      </Carousel>
    );

    const slides = screen.getAllByText(/Slide/);
    expect(slides.length).toBe(3);
  });
});
