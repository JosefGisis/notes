## Design Patterns

### What are design patterns?

Design patterns describe a frequently occurring problem in object-oriented programming and provide a solution to that problem. By utilizing design patterns, applications become eminently more understandable, extensible, modifiable, and error resilient (pp. 2-3).

Design Patterns are divided into three categories:

1. Creational: the way objects are created.
2. Structural: the way objects relate to each other.
3. Behavioral: the way objects communicate with each other.

These categories are further divided by class and object scopes. Class based design patterns or object based design patterns specify whether the pattern relies on class composition or object composition, respectively.

### Design Pattern Catalogue.

-   #### Creational

    -   #### Class Based

        -   ##### Factory Method

            > Define an interface for creating an object, but let the subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

    -   #### Object Based

        -   ##### Abstract Factory

            > Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

        -   ##### Builder

            > Separate the construction of a complex object from its representation so that the same construction processes can create different representations.

        -   ##### Prototype

            > Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.

        -   ##### Singleton

            > Ensure a class only has one instance, and provide a global point of access to it.

-   #### Structural

    -   #### Class Based

        -   ##### Adapter (class)

            > Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn’t otherwise because of incompatibility interfaces.

    -   #### Object Based

        -   ##### Adapter (object)

            Same as adapter class except it converts an instance of the adaptee class rather than adapting the class via subclassing.

        -   ##### Bridge

            > Decouple an abstraction from its implementation so that the two can vary independently.

        -   ##### Composite

            > Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

        -   ##### Decorator

            > Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

        -   ##### Facade

            > Provide a unified interface to a set of interfaces in a system. Façade defines a higher-level interface that makes the subsystem easier to use.

        -   ##### Flyweight

            > Use sharing to support large numbers of fine-grained objects efficiently. A flyweight is a shared object that can be used in multiple contexts simultaneously. The flyweight acts as an independent object in each context; it’s indistinguishable from an instance of the object that’s not shared.

        -   ##### Proxy

            > Provide a surrogate or placeholder for another object to control access to it.

-   #### Behavioral

    -   #### Class Based

        -   ##### Interpreter

            > Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

        -   ##### Template Method

            > Define a skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithms structure.

    -   #### Object Based

        -   ##### Chain of Responsibility

            > Avoid coupling the sender of a request to its receiver by giving more then one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.

        -   ##### Command

            > Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

        -   ##### Iterator

            > Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

        -   ##### Mediator

            > Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and lets you vary their interaction independently.

        -   ##### Memento

            > Without violating encapsulation, capture and externalize an object’s internal state so that the object can be restored to this state later.

        -   ##### Observer

            > Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

        -   ##### State

            > Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

        -   ##### Strategy

            > Defines a family of algorithms, encapsulates each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients who use it.

        -   ##### Visitor

            > Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

### Design patterns outline some basic principles.

1. <h4>Program to an interface, not an implementation:</h4> Polymorphism requires clients to be able to work with exchangeable implementations, and in order to do so, all objects of a subclass need to be able to stand in for objects of its superclass (think of Liskov's substitution principle). By programming to an interface, we can interchange all objects that share an interface (pp. 17-8).

2. <h4>Favor object composition over inheritance:</h4> Class inheritance results in large, monolithic, static structures. Changes to parent classes, necessitates refactoring all inheriting classes. Furthermore, class inheritance fundamentally breaks encapsulation by exposing classes' structures. Object composition (while suffering from its own downsides, namely being harder to understand) is preferable (pp. 18-20).

3. <h4>Encapsulate variation:</h4> When an aspect of a program varies or is highly dynamic, encapsulating that functionality simplifies the application's logic and makes it easier to modify and extend. This is the principle behind most behavioral design patterns (p. 345).

Josef Gisis 10/6/2024

---

Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1995). _Design Patterns: Elements of Reusable Object-Oriented Software_. Addison-Wesley.
