import { requestData } from '../numberApi';

describe('requestData', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('Sample fact'),
      })
    ) as jest.Mock;
  });

  it('calls correct URL for math', async () => {
    await requestData('42/math');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://numbersapi.com/42/math',
      expect.anything()
    );
  });

  it('returns correct text', async () => {
    const result = await requestData('random/trivia');
    expect(result).toBe('Sample fact');
  });

  it('handles errors gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('API error')
    );
    const result = await requestData('badinput');
    expect(result).toBeUndefined();
  });
});
