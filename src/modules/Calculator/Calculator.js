import * as $ from 'jquery';
import { isNumber, isReset, isAdditional, isOperation, isEqual, reduceResult } from '../../utils/helpers';
import { operationsMap } from '../../utils/operationsMap';
import { DISPLAY, PAD } from '../../utils/constants';

function Calculator() {
    this.flow = [];
    this.current = null;

    $(PAD).on('click', this.padListener.bind(this));
}

Calculator.prototype.padListener = function(e) {
    const target = e.target.id;

    if (isNumber(target)) {
        this.setCurrent(target)
    } else if (isReset(target)) {
        this.reset();
    } else if (isAdditional(target)) {
        this.additionalOperation(target)
    } else if (isOperation(target)) {
        this.setOperation(target);
    } else if (isEqual(target)) {
        this.result();
    }
};

Calculator.prototype.setDisplay = function(result) {
    $(DISPLAY).html(result || 0);
};

Calculator.prototype.setCurrent = function(target) {
    this.current = this.current === null
        ? target
        : this.current + target;

    this.setDisplay(this.current);
};

Calculator.prototype.setOperation = function(target) {
    if (this.current === null) {
        this.flow[this.flow.length - 1] = target;
    } else {
        this.flow.push(this.current, target);
    }

    this.resetCurrent();
};

Calculator.prototype.resetCurrent = function() {
    this.current = null;
};

Calculator.prototype.additionalOperation = function(target) {
    const fn = operationsMap[target];

    if (fn) {
        this.flow.push(fn(this.current));
        this.resetCurrent();
        this.result();
    }
};

Calculator.prototype.result = function() {
    if (this.current !== null) {
        this.flow.push(this.current);
    }

    const result = this.flow.reduce(reduceResult, 0);

    this.flow = [];
    this.current = result;
    this.setDisplay(result);
};

Calculator.prototype.resetCurrent = function() {
    this.current = null;
};

Calculator.prototype.reset = function() {
    this.flow = [];
    this.resetCurrent();
    this.setDisplay();
};

export { Calculator };
