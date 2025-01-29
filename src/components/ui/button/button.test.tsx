import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders the button with correct variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('primary');
  });

  it('applies the correct size class', () => {
    render(
      <Button variant="primary" size="l">
        Large Button
      </Button>
    );
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('l');
  });

  it('applies extra height when extraHeight is true', () => {
    render(
      <Button variant="secondary" extraHeight>
        Button with Extra Height
      </Button>
    );
    const button = screen.getByText('Button with Extra Height');
    expect(button).toHaveClass('extraHeight');
  });

  it('does not apply extra height when extraHeight is false', () => {
    render(<Button variant="secondary">Button without Extra Height</Button>);
    const button = screen.getByText('Button without Extra Height');
    expect(button).not.toHaveClass('extraHeight');
  });

  it('disables the button when disabled is true', () => {
    render(
      <Button variant="primary" disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('fires onClick event when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <Button variant="primary" onClick={onClickMock}>
        Click Me
      </Button>
    );
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the active class when active is true', () => {
    render(
      <Button variant="primary" active>
        Active Button
      </Button>
    );
    const button = screen.getByText('Active Button');
    expect(button).toHaveClass('active');
  });

  it('does not apply the active class when active is false', () => {
    render(<Button variant="primary">Inactive Button</Button>);
    const button = screen.getByText('Inactive Button');
    expect(button).not.toHaveClass('active');
  });

  it('applies custom className if provided', () => {
    render(
      <Button variant="secondary" className="custom-class">
        Custom Button
      </Button>
    );
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-class');
  });
});
