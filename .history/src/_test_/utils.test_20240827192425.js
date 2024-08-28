import { truncateAddress } from '../src/lib/utils';

describe('Utility Functions', () => {
  describe('truncateAddress', () => {
    it('truncates a long address correctly', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(truncateAddress(address)).toBe('0x1234...7890');
    });

    it('returns the original address if it\'s short', () => {
      const address = '0x1234';
      expect(truncateAddress(address)).toBe('0x1234');
    });

    it('handles null or undefined input', () => {
      expect(truncateAddress(null)).toBe('');
      expect(truncateAddress(undefined)).toBe('');
    });
  });
});