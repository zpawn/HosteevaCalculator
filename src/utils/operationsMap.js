import { add, divide, multiply, sqrt, subtract, square } from './fn';
import { DIVIDER, MULTIPLY, SUBTRACT, ADD, SQRT, SQUARE } from './constants';

export const operationsMap = {
    [DIVIDER]: divide,
    [MULTIPLY]: multiply,
    [SUBTRACT]: subtract,
    [ADD]: add,
    [SQRT]: sqrt,
    [SQUARE]: square,
};
