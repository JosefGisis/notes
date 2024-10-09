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
 * Functions contain an internal property called [[call]] that is used to identify them as functions.
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
 * Both data and accessor properties contain the properties Enumerable and Configurable. Enumerable specifies that it
 * is iterated over, and Configurable specifies that it can be deleted or its properties changed. Once configurable is set
 * to false it cannot be reversed, so be careful when setting it.
 *
 * Data properties also have the property Writable, which specifies if the property can be changed, and Value, which specifies
 * the value of the property.
 *
 * Accessor properties have the properties Get and Set, which specify the getter and setter functions.
 *
 * You can use the Object.defineProperty method to define these properties, or you can use the Object.defineProperties method
 * to define multiple properties at once.
 *
 * Be careful to specify all properties when creating a property with defineProperty, otherwise they default to null. Which means
 * writeable and configurable are false (which irreversible).
 */
console.log('\n', 'Property attributes:')
const objectExample = {}
Object.defineProperty(objectExample, '_name', {
	configurable: true,
	enumerable: true,
	value: 'Josef',
	writable: true,
})

Object.defineProperties(objectExample, {
	_age: {
		configurable: true,
		enumerable: true,
		value: 0,
		writable: false,
	},
	name: {
		set: function (value) {
			console.log('setting name...')
			this._name = value
		},
		get: function () {
			console.log('getting name...')
			return this._name
		},
		configurable: true,
		enumerable: true,
	},
})

objectExample.name = 'Josef Gisis'
objectExample._age = 1
console.log(objectExample._age)
console.log(Object.getOwnPropertyDescriptor(objectExample, '_age'))

/**
 * Locking objects:
 *
 * You can lock objects to prevent them from being changed. This is useful for mimicking the behavior of classes in other
 * languages. The method are:
 * preventExtensions() prevents new properties from being added to an object.
 * seal() prevents new properties from being added and existing properties from being deleted.
 * freeze() prevents new properties from being added, existing properties from being deleted,
 * and existing properties from being changed. Basically provides a snapshot of an object (think of memento design pattern).
 */
console.log('\n', 'Locking objects:')
Object.preventExtensions(objectExample)
objectExample.newProperty = 'newProperty'
console.log(objectExample)
Object.seal(objectExample)
delete objectExample._age
console.log(objectExample)
Object.freeze(objectExample)
objectExample.name = 'Josephina'
console.log(objectExample)
console.log('Nothing changed!')

/**
 * Constructors and Prototypes:
 *
 * While we can use the new keyword with some predefined object, and we can use object creation literal syntax, we
 * do need to achieve the behavior of classes. Meaning, we want to create a blueprint for an object that can be reused (prototype).
 * We do this using a constructor function. This works with the new keyword to create a new object and a constructor function.
 */
console.log('\n', 'Constructors:')
// Used Pascal casing in the tradition of class naming.
function Person(name) {
	this.name = name
}

const myPerson = new Person('Josef')
// While the default behavior is to define this.propertyName you can also return an object. If something other than an
// object is returned, the return value is ignored, and the default behavior is used.

function AnotherPerson(name) {
	Object.defineProperty(this, 'name', {
		value: name,
		writable: true,
		enumerable: true,
		configurable: true,
	})
}

const anotherPerson = new AnotherPerson('Josef')
console.log(anotherPerson instanceof AnotherPerson)

// Always make sure to use new when instantiating a constructor function. If you forget to use new, the this keyword will
// refer to the global object and you will get some unwanted properties on the global object.

/**
 * Prototypes:
 * Every object in JS has a prototype property that is a reference to another object. This object is called the prototype object.
 * This is what make JavaScript a prototype-based language. When you try to access a property on an object, JS first looks at the
 * object itself, then it looks at the prototype object, and then it looks at the prototype object of the prototype object, and so on.
 * This is called the prototype chain. It calls the first function or uses the first property it finds in the prototype chain.
 */
console.log('\n', 'Prototypes:')
console.log(Object.getPrototypeOf(anotherPerson)) // {}
console.log(anotherPerson.hasOwnProperty('toString')) // false
anotherPerson.toString = 'this is no longer a function'
console.log(anotherPerson.hasOwnProperty('toString')) // true
// This only changes the instance, not the prototype.

/**
 * Prototypes are ideal for sharing methods between objects. You can add a method to the prototype object and all objects
 * use that function. This prevents code duplication. You would not want to use this for data properties, as they would be
 * shared between all objects.
 *
 * Instances do not have a direct link to its constructor. The constructor is related to the property, and instances are related to
 * the prototype. Kind of like an if a equals b, and c equals b, then a equals c situation.
 */
console.log('\n', 'Using prototypes with constructors:')
AnotherPerson.prototype.sayName = function () {
	console.log(this.name)
}
console.log(Object.getPrototypeOf(anotherPerson)) // { sayName: [Function] }

// A more succinct way of creating a prototype.
AnotherPerson.prototype = {
	// Need to add this so it is not overwritten.
	constructor: AnotherPerson,

	sayName: function () {
		console.log(this.name)
	},
	sayAge: function () {
		console.log(this.age)
	},
}
const anotherAnotherPerson = new AnotherPerson('josef')
console.log(Object.getPrototypeOf(anotherAnotherPerson)) // { sayName: [Function], sayAge: [Function] }

/**
 * The previous example demonstrates an interesting distinction between setting a single prototype operation; rather, than
 * setting an object literal. When setting a single operation all instances of the prototype acquire the new operation because
 * their internal property [[prototype]] is just a pointer to the prototype. However, when setting it as an object literal (as
 * is done in the second example), I need to instantiate a new object to get the updated property type. This is very strange, and
 * I do not know the cause of this.
 *
 * This ability to change prototypes at will creates a unique situation with sealing and freezing operations. You can add operations
 * to a frozen or sealed object by extending its prototype!
 */

/** Another really cool detail about prototypes is that you can change the prototypes of native objects! That means
 * you can extend arrays and even primitives that use wrappers! This is a very powerful feature of JavaScript.
 */
console.log('\n', 'Extending native objects:')
Array.prototype.sum = function () {
	return this.reduce((acc, curr) => acc + curr, 0)
}

const testArray = [1, 2, 3, 4, 5]
console.log(testArray.sum()) // 15

String.prototype.isHelloWorld = function () {
	return this.toLowerCase() === 'hello world'
}
const helloWorld = 'Hello World'
console.log(helloWorld.isHelloWorld()) // true
// Sweet!

// DO NOT! DO NOT! DO NOT! change the prototypes of native objects! This is a very bad practice. It can cause
// unexpected behavior in other parts of the code.

/**
 * Inheritance:
 *
 * All objects in JavaScript inherit from Object. This is the root of the prototype chain. This is why all objects have the
 * methods:
 * - hasOwnProperty() - checks if a property is native to an object.
 * - propertyIsEnumerable() - checks if a property is enumerable.
 * - isPrototypeOf() - checks if an object is in the prototype chain.
 * - valueOf() - returns the value of the object.
 * - toString() - returns a string representation of an object.
 *
 * With primitive wrappers, valueOf() returns the primitive value of the object.
 * toString() returns the string representation of the object. This is often used when the object is used in a string context
 * or when valueOf() is supposed to return a primitive but it has not.
 *
 * JavaScript supports prototypical object creation out of the box. Furthermore it is the basis of inheritance in JavaScript.
 */
console.log('\n', 'Inheritance:')
const inheritedPerson = Object.create(myPerson, {
	name: {
		value: 'Pascal',
		enumerable: true,
		writable: true,
		configurable: true,
	},
})
console.log(inheritedPerson.name)

//You can also set the prototype to null
const nakedObject = Object.create(null)
if (hasOwnProperty in nakedObject) {
	console.log('hasOwnProperty is in nakedObject')
}
if (toString in nakedObject) {
	console.log('toString is in nakedObject')
}

/**
 * Constructor inheritance:
 *
 * With constructor inheritance we can somewhat mimic class inheritance. By default constructor use the prototype of
 * the basic object. We need to modify this so we can use some other prototype. We can do this by setting the prototype
 * of the constructor to the prototype of the object we want to inherit from.
 */
console.log('\n', 'Constructor inheritance:')
function Rectangle(length, width) {
	this.length = length
	this.width = width
}

Rectangle.prototype.getArea = function () {
	return this.length * this.width
}

Rectangle.prototype.toString = function () {
	return `[Rectangle ${this.length}x${this.width}]`
}

function Square(size) {
	this.length = size
	this.width = size
}

Square.prototype = new Rectangle()
Square.prototype.constructor = Square

Square.prototype.toString = function () {
	return `[Square ${this.length}x${this.width}]`
}

const square = new Square(5)
console.log(square.toString())

/**
 * The previous example demonstrates how to use constructor inheritance. The Square constructor prototype is
 * overwritten with a new Rectangle object. This allows the Square object to inherit the properties of the Rectangle
 * object. The constructor is then set to Square to ensure the correct constructor is called.
 *
 * Notice this method only works when the constructor for Rectangle does not require any arguments. If it did, and you
 * supplied them, you would have added the length and width properties to the Square object. This is not what you want.
 * Rather, use the Object.create method to create a new object with the prototype of the Rectangle object.
 */

/**
 * Constructor stealing:
 *
 * Unlike in some other languages, in JS you don't have to call the super method in the constructor. Rather, you can
 * use call and apply to call the constructor of the parent object. This is called constructor stealing.
 *
 * Constructor stealing is useful to apply the constructor of the parent object to the child object because it allows you
 * use the properties of the parent object in the child object. You cannot do this by setting an instance of the parent
 * object as the prototype of the child object because the properties of the parent object will be shared between all instances
 * of the child object. Say the width was 5feet, that would be the width of all instances of the child object.
 * Rather use this method:
 */
console.log('\n', 'Constructor stealing:')
function AnotherRectangle(length, width) {
	Rectangle.call(this, length, width)
	// Add some more properties here.
}

AnotherRectangle.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		value: AnotherRectangle,
		writable: true,
		configurable: true,
		enumerable: true,
	},
})

const anotherSquare = new AnotherRectangle(5, 5)
console.log(anotherSquare.toString())

/**
 * Accessing Supertype Methods:
 *
 * It is very common to override prototypes' methods in child objects. However, sometimes you want to access the parent
 * object's method. You can do this by using the prototype of the parent object. Again, use call and apply.
 */
// You would not want to do this in a real-world application. This is just for demonstration purposes.
console.log('\n', 'Accessing supertype methods:')
Square.prototype.toString = function () {
	const text = Rectangle.prototype.toString.call(this)
	console.log(text)
}

square.toString()

/**
 * Discussion:
 *
 * JavaScript is a very dynamic language. Its dynamism allows us to do all sorts of neat and dangerous things. We can dynamically
 * construct objects, change their properties, and even change the properties of native objects! Functions, don't even accept
 * a fixed number of predefined parameters; instead, they accept a list of arguments. It is very important to use best practices
 * and the good parts of JavaScript to avoid creating a hot mess.
 *
 * The first thing that pops up when learning about object-oriented JS is the prototypical nature of the language.
 * Unlike other programming languages, that use class based object construction, JS uses prototype-based object construction.
 * That is, it copies the properties of an object to another object. Instead of a class inheritance tree, there is a chain of
 * prototypes that is used to access properties of an object.
 * All objects have, at some point in its prototype chain, a reference to the Object.prototype (the most basic object).
 * This is the root of the prototype chain. Furthermore, Object.prototype has a reference to null. This is the end of the
 * prototype chain.
 *
 * Another thing that is interesting is that all reference types are objects that ultimately inherit from Object, even/especially
 * functions. What makes arrays and function different from a basic object is that they have special properties and methods (for
 * example the length property of an array, or the call method for functions) that define them.
 *
 * We can instantiate objects in JS in a number of ways. We can use the new keyword with a constructor function, or we can use the
 * object literal syntax. We can also use the Object.create method to create a new object with a specific prototype.
 *
 * And this raises an interesting question: if we can create an object with a function, and all functions are objects, which further
 * need to be created with a function, then how do we create the first object?. It is a sort of chicken and egg problem.
 * I saw a possible answer that JS's engine would create the native objects in a process that is called bootstrapping.
 * Meaning they do not need to be created with a function, so they do not run into that circular problem. Subsequent objects would
 * be created with the already created objects.
 *
 * Because of the way JS instantiates objects, how can we mimic some behavior of classes in other languages such as inheritance,
 * polymorphism, and encapsulation?
 * We can use constructor functions, prototypes, prototypical inheritance, getters/setters, and a combination of Object.preventExtensions,
 * Object.seal, and Object.freeze.
 *
 * Some of the ways we can mimic class-based instantiation are:
 * - To mimic class based instantiation we can use constructor functions.
 * - To mimic private properties we could use getters and setters. We could also use defineProperty to further control the properties of an object.
 * - To mimic the fixed methods and properties of a class we can use Object.seal() to prevent adding or deleting properties (although this
 * can be undermined by altering its prototype after it has been sealed).
 * - To mimic inheritance we could use constructor functions and prototypes. Futhermore, we could use constructor stealing to apply the
 * constructor of the parent object to the child object and get the properties of the parent object.
 * - We can override the prototype methods of the parent object in the child object by creating a new method in the child object.
 * - We can access the parent object's methods by using the prototype of the parent object and calling the method with call or apply.
 * - and many more...
 */
