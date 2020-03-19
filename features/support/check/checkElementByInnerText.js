const assert = require('assert').strict;

/**
 * Checks an input, textarea or select element's value.
 * @param {String} selector CSS selector of the element whose value you're checking.
 * @param {String} not Null when checking for visible, otherwise checking for hidden.
 * @param {String} value The value to check for.
 */
module.exports = async function (selector, not, value) {
    /* istanbul ignore next */  // Required otherwise code coverage evaluation fails within $eval calls
    await this.page.waitForSelector(selector)
    const elementValue = await this.page.$eval(selector, el => el.innerText.trim());
    const expectedValue = value === undefined ? '' : value;
    const shouldValueBeEqual = not ? false : true;
    assert(elementValue !== undefined, `Expected "${selector}" to have a value`);
    assert.strictEqual(elementValue === expectedValue, shouldValueBeEqual, `Expected "${selector}" to ${shouldValueBeEqual ? 'have' : 'not have'} a value of "${elementValue}"`);
};