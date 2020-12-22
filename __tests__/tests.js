'use strict';

const driver = require('../modules/driver');
const events = require('../events');
const caps = require('../caps');
const vendor = require('../modules/vendor');
// const { beforeEach, afterEach, it, expect, jest } = require('@jest/globals');

describe('handlers', () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        consoleSpy.mockRestore();
    });
    it('pick-up', () => {
        events.emit('pick-up', { orderId: 1 });
        jest.useFakerTimers();
        expect(consoleSpy).toBeCalled();
    });
    it('delivered', () => {
        events.emit('delivered', { orderId: 1 });
        expect(consoleSpy).toBeCalled();
    });
    it('thank you', () => {
        events.emit('thank you', { orderId: 1 });
        expect(consoleSpy).toBeCalled();
    });
});
