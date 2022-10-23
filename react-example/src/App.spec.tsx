import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '@App';

describe('App', () => {
  render(<App />);
  it('should render Hello World', () => {
      const textContent = screen.getByTestId('title').textContent;
      expect(textContent).toEqual('Hello World');
  });
});
