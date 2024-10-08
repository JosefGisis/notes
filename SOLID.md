## SOLID Design Principles

This directory contains an interpreter for evaluating boolean expressions. It utilizes several design patterns (namely _interpreter_) while conforming to SOLID principles. If any design pattern requires violating SOLID principles, a note will specify the violation as part of the design pattern.

The SOLID design principles provide a set of guidelines for creating extensible, modifiable, clear, and error resilient object-oriented code.

#### S. Single Responsibility Principle

Classes should only be responsible for one thing. This means that:

> a class should have only one reason to change

By simplifying the interface of classes and only giving them a single job, they become a lot more manageable, understandable, and more loosely coupled.

#### O. Open-closed Principle

The open-closed principle states:

> all classes should be open to extension, but closed to modification

This intertwines with other SOLID principles: by "closing" a class to modification it retains its single responsibility status, keeps its interface segregated, and ensures it is not dependant on lower modules. But most importantly, keeping a class closed to modifications prevents having to refactor all its inheriting classes.

#### L. Liskov Substitution Principle

All objects of a given class should be replaceable with all objects of its parent class (this is similar to Design Pattern's "program to an interface, not an implementation.") This allows us to utilize polymorphism.

#### I. Interface Segregation Principle

The interface segregation principle states that no client should be forced to implement parts of an interface that is not relevant to it. Rather than creating broad interfaces with many operations, create a narrow on, so that all inheritors only share an interface that represents their commonality. Interface segregation allows us to close classes to modification: if they had broad interfaces, they would necessarily have to be modified to accommodate changes in the application.

#### D. Dependency Inversion Principle

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

This makes systems a lot easier to understand and less error prone. It also reduces tight coupling in your application. Tightly coupled systems are usually harder to update, factor, and understand.

---

Upadhyay, k. (2024). _SOLID Principles in Programming: Understand With Real Life Examples_. Retrieved from https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/
