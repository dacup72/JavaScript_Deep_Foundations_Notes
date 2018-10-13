'use strict'

/* === SCOPE === (Where to look for things)

- Javascript is a compiled language (it can find syntax errors before run time).

- Function scope (where functions are the unit of scope).
*/

// Function Scope

// Formal variable declaration (global scope).
var foo = "bar";

// Formal function declaration (global scope).
// Generates new scope inside the function.
function bar() {
  console.log(foo); // Undefined because this scopes foo does not have a value yet.

  // Formal variable declaration (bar scope).
  var foo = "baz";
};

// Formal function declaration (global scope).
// Foo is treated like a formal variable declaration for baz scope.
function baz(foo) {

  // Not a formal declaration, reassigns source value (baz scope).
  foo = "bam";

  // Bam is only registered as a target on compile time as it is not formally declared.
  // On run time "go fish" happens where javascript engine goes up one scope at a time to search for its formal declaration.
  // If it reaches the global scope and still does not find it then the global scope declares a new global variable for bam on the global scope.
  bam = "yay"; // (global scope) unless 'use strict' is on (then its an error).
};

/* Notes

Position (relatove to =):
  - The left hand side of "=" is called the "Target".
  - The right hand side of "=" is called the "Source".

Declarations: 
  - Declarations are only handled at compile time (not run time).

Lexical Scope:
  - Lexical scope is based on where variables and blocks of scope have been authored in the source code.  
  - Lexical scopes are nested.

'use strict': 
  - Makes things errors that normally are not in javascript.
  - Only runs on file where it is used.
*/

// Examples

// ==========

var foo = "bar"; // (global scope)

function bar() { // (global scope)
  var foo = "baz"; // (bar scope)

  function baz(foo) { // (bar scope)
    foo = "bam"; // (baz scope)
    bam = "yay"; // (global scope)
  };
  baz();
};
bar();

foo; // "bar"
bam; // Normal mode: "yay", 'use strict' mode: error, undeclared
baz(); // "undefined" (reference error, global does not create a declared function for us)

// ==========

// Function Expression: Assigned to a larger expression syntax, typically a variable.
// The bar identifier in this function expression is available within its own scope (A reference to its self).
var foo = function bar() {
  var foo = "baz";

  // Function Declaration/Statement: Can not be nested in non-function blocks.
  function baz(foo) {
    foo = bar;
    foo;
  };
  baz();
};

foo();
bar();

// ==========

var foo;

try {
  foo.length;
}
// 'err' is block scoped to the catch clause its self.
catch (err) {
  console.log(err); // TypeError
};

console.log(err); // ReferenceError