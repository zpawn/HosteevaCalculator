import { operationsMap } from './operationsMap';
import { NUMBERS, OPERATIONS, ADDITIONAL, EQUALS, RESET } from './constants';

export const isNumber = (value) => NUMBERS.includes(value);

export const isOperation = (value) => OPERATIONS.includes(value);

export const isAdditional = (value) => ADDITIONAL.includes(value);

export const isEqual = (value) => value === EQUALS;

export const isReset = (value) => value === RESET;

export const isFloat = (x) => Number(x) === x && x % 1 !== 0;

export const toFloat = (x) => x.toFixed(2);

export const reduceResult = (result, value, index, flow) => {
    if (isOperation(value)) {
        return result;
    }

    if (index === 0) {
        return toFloat(Number(value));
    }

    const x = Number(result);
    const y = Number(value);
    const operation = flow[index - 1];

    result = operationsMap[operation](x, y);

    return isFloat(result) ? toFloat(result) : result;
};
