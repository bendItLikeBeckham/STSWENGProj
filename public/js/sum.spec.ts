import { mount } from '@vue/test-utils'
import { describe } from 'vitest';
const sum = require('./sum');

describe('adds 1 + 2 to equal 3', () => {
  test("Function is correct", () => {
    expect(sum(1, 2)).equal(3);
  })
});