'use strict'

// === SCOPE === (Where to look for things)

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

// ==========

// Function Scoping

var foo = "foo";

var foo = "foo2";
console.log(foo); // 'foo2'

console.log(foo); // 'foo2'

// How to fix it with function scope:
// The problem is that this polutes the global name space with 'bob'.

var foo = "foo";

function bob() {
  var foo = "foo2";
  console.log(foo); // 'foo2'
};
bob();

console.log(foo); // 'foo'

// How to fix poluting global name space with IIFE:

var foo = "foo";

// It is now a function expression because the word 'function' is no longer the first word.
(function bob() {
  var foo = "foo2";
  console.log(foo); // 'foo2'
})();

console.log(foo); // 'foo'

// ==========

// Block Scoping

function diff(x, y) {
  if (x > y) {
    var tmp = x; // Belongs to the diff scope because of 'var' declaration.
    let tmp = x; // Belongs to the if statement's scope because of 'let' declaration (Creates block scope).
    x = y;
    y = tmp;
  };

  tmp; // Defined as 'x' with 'var' keyword / Reference error with 'let' keyword

  return x - y;
};

// ==========

function formaStr(str) {
  // Creating an explicit block of scope.
  {
    let prefix, rest; // Let creates block scope for 'prefix' and 'rest' in the curly brackets it is inside of.
    prefix = str.slice(0, 3);
    rest = str.slice(3);
    str = prefix.toUpperCase() + rest;
  }

  if (/^FOO:/.test(str)) {
    return str;
  }

  return str.slice(4);
};

// ==========

function repeat(fn, n) {
  var result;

  // Let is always prefered vs var as the declaration of 'i' in a for loop.
  // Makes 'i' only available inside of the for loop.
  for (let i = 0; i < n; i++) {
    result = fn(result, i);
  };
};

// ==========

// Where 'var' is still very useful:

function lookupRecord(searchStr) {
  try {
    var id = getRecord(searchStr);
  }
  catch (err) {
    var id = -1;
  };

  return id; // Let would make id undeclared where as var makes it visible (Allows declaration to be close to where it is used).
};

// ==========

// Const Declaration

var a = 2;
a++; // 3

const b = 2;
b++; // Error

const c = [2];
c[0]++; // 3 <-- oops!?

// ==========

/* Notes

- Javascript is a compiled language (it can find syntax errors before run time).

Let Declaration:
  - The let keyword creates block scope (Like making an if statement have scope).
  - Creates scope based on curly brackets, not function keywords.
  - Let informs the reader of your code that you intend for block scoping so dont just replace all vars with let.
  - Let keyword throws error if used twice to define some variable name in same scope.

Const Declaration:
  - A variable that can not be reassigned.
  - Creates block scope the same way that 'let' does.
  - Only use it with values that are already supposed to be immutable like the value of pie (3.14...).
  - Const can be reassigned within its own block scope.

IIFE: 
  - Immediatly Invoked Function Expression
  - Creates scope without poluting the global name space.

Function scope: 
  - Where functions are the unit of scope.

Position (relatove to =):
  - The left hand side of "=" is called the "Target".
  - The right hand side of "=" is called the "Source".

Declarations: 
  - Declarations are only handled at compile time (not run time).

Lexical Scope:
  - Scope is fixed at run time (Easier to optimize).
  - Lexical scope is based on where variables and blocks of scope have been authored in the source code.  
  - Lexical scopes are nested.

Dynamic Scope:
  - Scope can change at run time and is determined by where something is called from.

'use strict': 
  - Makes things errors that normally are not in javascript.
  - Only runs on file where it is used.
*/


