'use strict'

// === Functions ===

// Anonymous Function Expression
var clickHandler = function() {

};

// Named Function Expression
// Always prefer to use this one over the anonymous one (Easier for stack trace debuggging and self calling);
var keyHandler = function keyHandler() {

};

/* Notes

- Function declarations have to have names where as expressions can be anonymous.

- You should always prefer a named function expression vs an anonymous function expression.

- If the function has more than 3 lines of code then use a function declaration (Due to its hoisting behaviors).
*/