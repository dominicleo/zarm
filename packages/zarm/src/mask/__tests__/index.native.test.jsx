import React from 'react';
import { render } from '@testing-library/react';
import { TouchableWithoutFeedback } from 'react-native';
import Mask from '../index.native';

describe('Mask', () => {
  it('renders correctly', () => {
    const wrapper = render(<Mask visible />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('blur method', () => {
    const wrapper = render(<Mask visible blur />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = render(<Mask visible onClick={onClick} />);
    wrapper.find(TouchableWithoutFeedback).props().onPress();
    expect(onClick).toBeCalled();
  });
});
