import test from 'node:test';
import assert from 'node:assert';

test('SUMA feliz', () => {
  assert.strictEqual(2 + 2, 4);
});

test('SUMA no feliz', () => {
  assert.strictEqual(2 + 2 === 5, false);
});
