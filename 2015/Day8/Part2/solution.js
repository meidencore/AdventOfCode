/*
--- Part Two ---
Now, let's go the other way. In addition to finding the number of characters of code,
you should now encode each code representation as a new string and find the number of characters
of the new encoded representation, including the surrounding double quotes.

For example:

"" encodes to "\"\"", an increase from 2 characters to 6.
"abc" encodes to "\"abc\"", an increase from 5 characters to 9.
"aaa\"aaa" encodes to "\"aaa\\\"aaa\"", an increase from 10 characters to 16.
"\x27" encodes to "\"\\x27\"", an increase from 6 characters to 11.
Your task is to find the total number of characters to represent the newly
encoded strings minus the number of characters of code in each original string literal.
For example, for the strings above, the total encoded length (6 + 9 + 16 + 11 = 42)
minus the characters in the original code representation (23, just like in the first part of
this puzzle) is 42 - 23 = 19.
*/

const fs = require("node:fs");
const path = require("node:path");

const filepath = path.join(__dirname, "input");

const text = fs
  .readFileSync(filepath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  })
  .trim()
  .split("\n");

const stringCode = text.reduce((sum, str) => sum + str.length, 0);

const newEncodeStringCode = text.map((string) => {
  const str = string.slice(1, string.length - 1);
  if (str === 0) return 6;
  let len = str.length + 6;
  let counter = 0;
  while (counter < str.length) {
    if (str[counter] === "\\") {
      if (str[counter + 1] === '"' || str[counter + 1] === "\\") {
        counter += 2;
        len += 2;
      } else {
        counter += 4;
        len += 1;
      }
    } else {
      counter++;
    }
  }

  return len;
});

const totalCharsNewEncode = newEncodeStringCode.reduce(
  (sum, current) => sum + current,
  0,
);

console.log(totalCharsNewEncode - stringCode);
