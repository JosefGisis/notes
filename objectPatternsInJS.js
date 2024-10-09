/**
 * Object Patterns in JavaScript
 *
 * JavaScript is a very dynamic language. Its dynamism allows us to do all sorts of neat and dangerous things. We can dynamically
 * construct objects, change their properties, and even change the properties of native objects! Functions, don't even accept
 * a fixed number of predefined parameters; instead, they accept a list of arguments. It is very important to use best practices
 * and the good parts of JavaScript to avoid creating a hot mess.
 *
 * Object patterns provide a way to mimic the good parts of other languages and enforce best practices. This a list of object patterns
 * for JS. These patterns are sourced from "The Principles of Object-Oriented JavaScript" by Nicholas C. Zakas.
 */

/**
 * The Module Pattern:
 *
 * One of the things that classical languages provide is the option to make instance variables private. This is very
 * useful for preventing modifying the properties in harmful ways. How can we achieve this in JavaScript?
 *
 * The mdoule pattern is a way to instantiate objects with hidden properties that can only be modified by the object's
 * operations. This pattern takes advantage of the closure property in JavaScript. It is done by creating an IIFE
 * (Immediately Invoked Function Expression) that returns an object. The object returned contains the public method
 * creates a variable, but only returns the public methods that can access the variable. In this way the variable
 * is hidden from the outside world.
 *
 * This example creates a singleton object that has a private variable _name and a public method getName. The private
 * variable can only be accessed by the public methods.
 */
console.log('\n', 'Module Pattern')

let person = (function () {
	let _name = 'John Doe'
	let _age = 25

	return {
		getName: function () {
			return _name
		},
		setName: function (name) {
			console.log('You cannot change the name')
		},
		getAge: function () {
			return _age
		},
		getOlder: function () {
			_age++
		},
	}
})()

person.setName('Jane Doe')
console.log(person.getAge())
person.getOlder()
console.log(person.getAge())

/**
 * There is a slightly different method called the revealing module pattern which declares the methods at the top
 * of the IIFE and just adds them to the returning object (rather than declaring them in the object). Tomato, tomahto.
 */

/**
 * Private Members for Constructors:
 *
 * We also would like to create private members for constructors. This is done by creating a constructor function
 * with locally scoped variables, like so:
 */
console.log('\n', 'Private Members for Constructors')
function Person(name, age) {
	let _age = age
	this.name = name

	this.getAge = function () {
		return _age
	}
}

const myPerson = new Person('John Doe', 25)

myPerson._age = 30
console.log(myPerson.getAge())

/**
 * What if we to create a private class member that is shared by all instances of the class? We can do this
 * by combining the module pattern with the constructor pattern. This time the module pattern return the
 * constructor function for the "class" that will share the instance variable.
 */
console.log('\n', 'Private Class Members')
// By using an IIFE we make AnotherPerson the return value of the IIFE (which is InnerPerson). And
// instance shares a copy of _age.
var AnotherPerson = (function () {
	let _age = 25

	function InnerPerson(name) {
		this.name = name
	}

	InnerPerson.prototype.getAge = function () {
		return _age
	}

	InnerPerson.prototype.getOlder = function () {
		_age++
	}

	return InnerPerson
})()

const john = new AnotherPerson('John Doe')
const jane = new AnotherPerson('Jane Doe')

console.log(john.getAge())
console.log(jane.getAge())

john.getOlder()

console.log(john.getAge())
console.log(jane.getAge())

/**
 * Mixins:
 *
 * In JS we have pseudo-classical inheritance (when you use Object.create() to mimic inheritance). We also prototypical
 * inheritance (we set the prototype of an object to another object). But what if we want to get the methods of one "type"
 * on an object without altering the prototype chain? We can use mixins. Mixins combine the properties of one object with
 * another object. This is how dynamic object structures help us in JS (although I would likely never use this method).
 *
 * Mixin takes a receiver and a supplier object. It copies the properties of the supplier object to the receiver object.
 * Now the receiver has the properties of the supplier object without altering the prototype chain.
 *
 * This is called pseudo-inheritance because the receiver object is not a true instance of the supplier object.
 */
console.log('\n', 'Mixins')
function mixin(receiver, supplier) {
	// this first condition allows us to to copy setters and getters as well as data properties.
	// If the properties are just copied as is, accessor properties will become data properties.
	if (Object.getOwnPropertyDescriptor) {
		Object.keys(supplier).forEach(function (property) {
			var descriptor = Object.getOwnPropertyDescriptor(supplier, property)
			Object.defineProperty(receiver, property, descriptor)
		})
		// Older version of JS may not have Object.getOwnPropertyDescriptor method.
	} else {
		for (var property in supplier) {
			if (supplier.hasOwnProperty(property)) {
				receiver[property] = supplier[property]
			}
		}
	}

	return receiver
}

// Usage
const Elephant = function () {
	Object.defineProperties(this, {
		_color: {
			value: 'gray',
			writable: true,
			configurable: true,
			enumerable: false,
		},
		color: {
			get: function () {
				return this._color
			},
			set: function (value) {
				console.log('You cannot change the color')
			},
			configurable: true,
			enumerable: true,
		},
		weight: {
			value: 'very heavy',
			writable: true,
			configurable: true,
			enumerable: true,
		},
	})
}

Elephant.prototype.makeNoise = function () {
	console.log('Trumpet')
}

const Pet = function (name) {
	this.name = name
}

// Dumbo is a pet elephant, but we don't want to change the prototype chain.

const dumbo = new Pet('Dumbo')
mixin(dumbo, new Elephant())

dumbo.color = 'pink'

// Dumbo is a pet and not an elephant, so although we have the properties of an elephant, we cannot use its methods.
try {
	dumbo.makeNoise()
} catch (e) {
	console.error(e)
}

/**
 * Scope-Safe Constructors:
 *
 * If you call a constructor function without the new keyword, the constructor function will be called in the global scope
 * and apply the properties to the global object. This is a bad practice. To prevent this, we can create a scope-safe constructor
 * like so:
 */
console.log('\n', 'Scope-Safe Constructors')
function Parent(name, child) {
	if (this instanceof Parent) {
		this.name = name
		this.child = child
	} else {
		return new Parent(name, child)
	}
}

const parent = Parent('John Doe', 'Jane Doe')
console.log(parent)

if ('child' in this) {
	console.log('Unwanted properties added to global object')
} else {
	console.log('The properties are not added to the global object')
}
