import { tokenize } from './utils'

it('simple message', () => {
  const actual = 'Hello'
  const expected = ['Hello']

  expect(tokenize(actual)).toEqual(expected)
})

it('with one named variable', () => {
  const slots = ['name']

  const actual = 'Hello, {name}'
  const expected = ['Hello, ', '{name}']

  expect(tokenize(actual, slots)).toEqual(expected)
})

it('with the same named variable, several times', () => {
  const slots = ['name']

  const actual = 'Hello, {name} and {name}'
  const expected = ['Hello, ', '{name}', ' and ', '{name}']

  expect(tokenize(actual, slots)).toEqual(expected)
})

it('with several named variables', () => {
  const slots = ['one', 'two', 'three']

  const actual = 'Hello, {one}, {two} and {three}!'
  const expected = ['Hello, ', '{one}', ', ', '{two}', ' and ', '{three}', '!']

  expect(tokenize(actual, slots)).toEqual(expected)
})

it('with several named variables, multiple times', () => {
  const slots = ['one', 'two']

  const actual = 'Hello, {one}, {two} and {two}!'
  const expected = ['Hello, ', '{one}', ', ', '{two}', ' and ', '{two}', '!']

  expect(tokenize(actual, slots)).toEqual(expected)
})
