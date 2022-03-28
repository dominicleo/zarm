import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Mask from '../index';

describe('Mask', () => {
  it('renders correctly', () => {
    const wrapper = render(<Mask visible />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('blur method', () => {
    const wrapper = render(<Mask visible blur />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('onClick', async () => {
    const onClick = jest.fn();
    render(<Mask data-testid='mask' visible onClick={onClick} />);
    const mask = screen.getByTestId('mask');
    fireEvent.click(mask);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
