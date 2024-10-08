/**
 * This is a file to demonstrate some of the features of JavaScript. This is not a comprehensive guide to JavaScript; rather it covers more advanced
 * features of the language.
 *
 * The information in this file is based on the book "The Principles of Object-Oriented JavaScript" by Nicholas C. Zakas.
 *
 * - Josef Gisis 10/6/2024
 */

/**
 * Identifying primitive and reference types in JavaScript:
 *
 * Identifying primitive types in JS is very simple: you just use the typeof operator. The exception to this is the null type,
 * which returns object. This was acknowledged as an error in the language. The correct way to check for null is to compare it
 * to null. For example:
 */
console.log('\n', 'Identifying primitive types:')
const myNumber = 1
const myNull = null
console.log(typeof myNumber) // number
console.log(typeof myNull) // object
console.log(typeof myNull === typeof null || myNull === null) // true

/**
 * Because functions and arrays are first class objects in JavaScript, it can be difficult to identify them. Arrays are very simple
 * to identify because you can just use typeof === 'function'. A more precise way to identify objects is to use instanceof.
 */
const functionLiteral = function () {}
const arrayLiteral = []

console.log('\n', 'Identifying reference types:')
console.log(typeof functionLiteral) // function
console.log(typeof arrayLiteral) // object
console.log(functionLiteral instanceof Function) // true
console.log(arrayLiteral instanceof Array) // true

/**
 * However, when it comes to arrays, instanceof may not always be accurate arrays, as arrays can be passed back and forth between frames in
 * a browser. If such is the case instanceof will not work. Use Array.isArray() instead.
 */
console.log(Array.isArray(arrayLiteral)) // true

/**
 * Primitive Wrapper Types:
 *
 * JavaScript has a fairly confusing feature called primitive wrapper types. In order to allow primitive types to have
 * features similar to objects, JS temporarily converts them to objects. This is called autoboxing. However it immediately
 * deletes the object after the operation is done. So while you can call an operation on a string, like say string.length, you
 * can only use the return value for that operation, but the string itself remains a primitive type. For example:
 */
console.log('\n', 'Primitive Wrapper Types:')
let name = 'John'
let firstChar = name.charAt(0)
console.log(firstChar) // J

// But this is what is really happening in the background:
let _name = 'John'
let temp = new String('John')
let _firstChar = temp.charAt(0)
temp = null
console.log(_firstChar) // J
// The string does not actually have those properties; rather, a temporary object is created, the property is accessed, and then the object is deleted.

/**
 * Functions:
 *
 * Functions can be declared in one of two ways.
 */
console.log('\n', 'Creating functions:')
// 1. Function Declaration.
function sayHelloDeclaration() {
	console.log('Hello')
}
// Function declaration can be declared after they are invoked (in a process called hoisting).

// 2. Function Expression. This of this as an object function.
const sayHelloExpression = function () {
	console.log('Hello')
}

/**
 * Function parameters in JavaScript are interesting. Rather, than a set number of defined operators, the parameters in a JS function is a actually
 * a list like object called arguments. This allows you to pass in any number of arguments to a function. You can also access the arguments object
 * within a function. Because it in an array, there is no strict type checking on the arguments. You can also pass in more arguments than the function
 * expects, or you can pass fewer. This means you need to be careful when using the arguments object (a linter like ESLint can help with this).
 */
console.log('\n', 'Function parameters:')
function functionExample(firstArg, secondArg, ...rest) {
	console.log(arguments.length)

	console.log(firstArg)
	console.log(secondArg)
	rest.forEach((arg) => console.log(arg))
}

functionExample(1, 2, 3, 4, 5)
functionExample(1)

/**
 * Because functions are first-class objects in JavaScript, you cannot use function overloading. If you want to have multiple functions with the same
 * name, you can use a single function with multiple if statements to check the number of arguments passed in.
 */

/**
 * The this keyword in JavaScript is a reference to the object that is executing the current function (caller/sender).
 * The value of this is determined by how a function is called.
 */
console.log('\n', 'The this keyword binding:')
const logPersonName = function () {
	console.log(this.name)
}

const firstPerson = {
	name: 'John',
	sayName: logPersonName,
}

const secondPerson = {
	name: 'Jane',
	sayName: logPersonName,
}

firstPerson.sayName()
secondPerson.sayName()

/**
 * Additionally there are more methods to provide additional control over the this keyword.
 */
// The call method allows you to call a function with a given this value and arguments provided individually.
logPersonName.call(firstPerson)

// The apply method is similar to the call method, but it takes an array of arguments only rather than specific arguments.
logPersonName.apply(firstPerson, ['argument1', 'argument2'])

// The bind returns an argument with a specific this value and arguments.
const logJohnName = logPersonName.bind(firstPerson)
logJohnName()
const logJaneName = logPersonName.bind(secondPerson)
logJaneName()

/**
 * Objects:
 *
 * We can check for properties in an object by checking if it is truthy; however, sometimes a value is intentionally
 * falsy (say it is an empty string or 0), so a more precise way to check for a property is to use the in operator.
 */

console.log('\n', 'Checking for properties in an object:')
const objectWithProperties = {
	name: 'Josef',
	age: 0,
}

if (objectWithProperties.age) {
	console.log('Age is truthy')
} else {
	console.log('Age is falsy')
}

if ('age' in objectWithProperties) {
	console.log('Age is in object')
} else {
	console.log('Age is not in object')
}

// You can also use the hasOwnProperty method to check if a property is in an object rather than in its propotype.
if (objectWithProperties.hasOwnProperty('age')) {
	console.log('Age is native to object')
}

/**
 * Data properties vs accessor properties:
 *
 * Data properties are exactly what the sound like; accessor properties provide a way of controlling how data properties
 * are set and getted.
 */
console.log('\n', 'Data properties vs accessor properties:')
const objectWithAccessors = {
	_data: 'data',
	get data() {
		console.log('you are getting data...')
		return this._data
	},
	set data(data) {
		console.log('you are setting the data')
		this._data = data
	},
}

console.log(objectWithAccessors.data)
objectWithAccessors.data = 'data?'
// If you only define a getter then it is read-only. If you only set a setter then it is write-only.

/**
 * Property attributes:
 *
 * Just like an object has properties, properties have properties too!
 */
