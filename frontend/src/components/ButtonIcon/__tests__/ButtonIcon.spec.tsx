import { render, screen} from '@testing-library/react';
import { ButtonIcon } from '..';

describe('buttonIcon tests', () => {
  it('should render button with given text', () => {
    const text = 'Text string';

    render(<ButtonIcon text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

export {};
