import { longestLineLength } from '../App';

it('longestLineLength "Type this te"', () => {
  const out = longestLineLength("Type this te", 2)
  expect(out).toBe(7); // or 4, or 9

});


