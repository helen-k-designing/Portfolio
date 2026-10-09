import { describe, it, expect } from 'vitest';
import { add } from './math';
describe('Функція add', () => {
it('має правильно додавати два додатні числа', () => {
expect(add(2, 3)).toBe(5);
});
it('має правильно працювати з відʼємними числами', () => {
expect(add(-1, 1)).toBe(0);
});
});