import { isValidInput } from '../utils/validation';

describe('Input validation', () => {
    it('validates number input for Math', () => {
        expect(isValidInput('Math', '42')).toBe(true);
        expect(isValidInput('Math', 'abc')).toBe(false);
    });

    it('validates date input for Date', () => {
        expect(isValidInput('Date', '2/23')).toBe(true);
        expect(isValidInput('Date', '13/40')).toBe(true);
        expect(isValidInput('Date', '23.02')).toBe(false);
        expect(isValidInput('Date', 'abc')).toBe(false);
    });

    it('rejects empty input', () => {
        expect(isValidInput('Math', '')).toBe(false);
        expect(isValidInput('Date', '')).toBe(false);
    });
});
