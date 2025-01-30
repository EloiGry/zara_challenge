import { useEffect } from 'react';

import { act, render } from '@testing-library/react';

import { useDebouncedCallback } from './use-debounce';

describe('useDebouncedCallback', () => {
  it('should call the callback after the specified delay', async () => {
    jest.useFakeTimers(); // Mock timers for controlling the delay

    const mockCallback = jest.fn();
    const delay = 500;

    const TestComponent = () => {
      const debouncedCallback = useDebouncedCallback(mockCallback, delay);

      useEffect(() => {
        debouncedCallback('Test');
      }, [debouncedCallback]);

      return null;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    // Ensure the callback is not called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward the timers to simulate the delay
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Ensure the callback is called once after the delay
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('Test');

    jest.useRealTimers(); // Clean up the fake timers
  });

  it('should cancel the previous call and only call the callback once', async () => {
    jest.useFakeTimers(); // Mock timers for controlling the delay

    const mockCallback = jest.fn();
    const delay = 500;

    const TestComponent = () => {
      const debouncedCallback = useDebouncedCallback(mockCallback, delay);

      // Triggering the debounced callback multiple times before the delay
      useEffect(() => {
        debouncedCallback('First');
        debouncedCallback('Second');
        debouncedCallback('Third');
      }, [debouncedCallback]);

      return null;
    };

    // Render the component and wait for the callback
    await act(async () => {
      render(<TestComponent />);
    });

    // Ensure the callback is not called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward the timers to simulate the delay
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Ensure the callback is called only once after the delay, with the last argument
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('Third');

    jest.useRealTimers(); // Clean up the fake timers
  });
});
