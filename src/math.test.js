"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const math_1 = require("./math");
(0, vitest_1.describe)('Функція add', () => {
    (0, vitest_1.it)('має правильно додавати два додатні числа', () => {
        (0, vitest_1.expect)((0, math_1.add)(2, 3)).toBe(5);
    });
    (0, vitest_1.it)('має правильно працювати з відʼємними числами', () => {
        (0, vitest_1.expect)((0, math_1.add)(-1, 1)).toBe(0);
    });
});
//# sourceMappingURL=math.test.js.map