# Markdown Guide

This file is my guide to markdown syntax. It is based on Darsaveli's Readme Markdown Syntax repo. Check out <https://github.com/darsaveli/Readme-Markdown-Syntax?tab=readme-ov-file#fenced-code-blocks>

-   Josef Gisis 10/01/2024

---

## Headers

```md
# Heading1

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading6
```

# Heading1

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading6

---

## Font Styles

```md
_Italics_
_Also italics_
**Bold**
**Also bold**
**_Bold and italics_**
_also italics and **bold**_
~~Striked text~~
```

_Italics_

_Also italics_

**Bold**

**Also bold**

**_Bold and italics_**

_also italics and **bold**_

~~Striked text~~

---

## Bulleted Lists

For unordered lists

```md
-   item1
-   item2
    -   subitem 1-1
    -   subitem 1-2
        -   subitem 1-2-1
        -   subitem 1-2-2
```

-   item1
-   item2
    -   subitem 1-1
    -   subitem 1-2
        -   subitem 1-2-1
        -   subitem 1-2-2

For ordered lists

```md
1. first
2. second
    1. third
    2. four
        1. five
        2. six
```

1. first
2. second
    1. third
    2. four
        1. five
        2. six

---

## Links

Links are of the format `[link placeholder](linkUrl linkAlt)`.
You can also use relative URLs if the link is to a sub url on the same page.

```md
-   [My github page](https://github.com/JosefGisis 'My github page')
-   https://github.com/JosefGisis
-   <https://github.com/JosefGisis>
```

-   [My github page](https://github.com/JosefGisis 'My github page')
-   https://github.com/JosefGisis
-   <https://github.com/JosefGisis>

---

## Inserting Images

Image insertion uses the format `![alt](URL 'title')`. Alt takes the place of the image if it cannot be diplayed, parenthesis contains the image source, and the title in quotes indicates the text to display when the mouse hovers over the image (can be omitted).

```md
![extremely menacing chick](/public/20221106_001445.jpg 'an extremely menacing chick')
```

![extremely menacing chick](/public/20221106_001445.jpg 'an extremely menacing chick')

### Resizing

Images can be resized using the HTML syntax.

```md
<img src="/public/20221106_001445.jpg" alt='a smaller image of an extremely menacing chick' width="20%" height='auto'/>
```

<img src="/public/20221106_001445.jpg" alt='a smaller image of an extremely menacing chick' width="20%" height='auto'/>

---

## Tables

```md
| Header1 | Header2 | Header3 |
| ------- | ------- | ------- |
| This    | is row  | 1       |
| This    | is row  | 2       |
| This    | is row  | 3       |
```

| Header1 | Header2 | Header3 |
| ------- | ------- | ------- |
| This    | is row  | 1       |
| This    | is row  | 2       |
| This    | is row  | 3       |

### Table Alignment

```md
| Align left |    Centered     | Align right |
| :--------- | :-------------: | ----------: |
| col 3 is   | some wordy text |       $1600 |
```

| Align left |    Centered     | Align right |
| :--------- | :-------------: | ----------: |
| col 3 is   | some wordy text |       $1600 |

---

## Checkboxes

```md
[ ] non-checked checkbox

[x] checked checkbox
```

[ ] non-checked checkbox

[x] checked checkbox

---

## Quoting Text

```md
> Block quoted text
```

> Block quoted text

---

## Multi-level Block Quoting

```md
> Quote 1
>
> > Quote 2
> >
> > > Quote 3
> > >
> > > > Quote 4
```

> Quote 1
>
> > Quote 2
> >
> > > Quote 3
> > >
> > > > Quote 4

---

## Text Highlighting

Text highlighting gives text a distinct backdrop. It also allows you to use a literal syntax (meaning you can use markdown syntax literally).

```md
`This text has a glow-up`
```

---

## Horizontal Line

There are four options for creating horizontal lines.

`___`

`***`

`---`

`<hr>`

---

## Line Break

`<br>`

---

## MD Comments

Markdown comments allow you to leave notes for yourself without it being visible in the rendered md.

```md
<!-- This is a markdown comment -->
```

<!-- This is a markdown comment -->

You won't see anything here because it is a comment. And no. This is not the comment. This is a standard line of text I have placed to let you know you will not be able to see the comment.

---

## Emojis

```md
:poop:

:grinning:

:frowning:
```

:poop:

:grinning:

:frowning:

You can also just insert an emoji using your keyboard's or system's emojis (window + . shortcut on Windows).

---

## Code/Text Blocks

Code/text blocks allow you to write literal text. There are four ways of doing this and one of them allows you to do some pretty cool things with code blocks.

1. Wrap the text with a single backtick: We have seen this earlier under text highlighting.
2. Prepend the text with a tab.
3. Prepend the text with four-spaces.
4. Wrap the text in triple backticks: This is the special method that provides unique features to code blocks

````md
`This is a text block wrapped
in a single backtick. We have mentioned
this syntax earlier`

<br>

    This is text block that
    is prepended by a tab.

<br>

    This is a text block prepended
    by four spaces. Depending on how wide
    you tabs are (mine is four spaces wide),
    this method and the previous method
    will look very similar.

<br>

```
This method is best suited for
code blocks as you will soon
see
```
````

`This is a text block wrapped
in a single backtick. We have mentioned
this syntax earlier`

<br>

    This is text block that
    is prepended by a tab.

<br>

    This is a text block prepended
    by four spaces. Depending on how wide
    you tabs are (mine is four spaces wide),
    this method and the previous method
    will look very similar.

<br>

```
This method is best suited for
code blocks as you will soon
see
```

### Code Blocks

The triple code block method allows you to highlight and format code blocks by their respective languages. You can do this by adding the language specification right after the first set of backticks. Check this out.

````md
```js
console.log('javascript')
```

<!-- This is what I have been using throughout this file to demonstrate the markdown syntax. -->

```md
# Heading 1

## Heading 2

### Heading 3
```

```python
print('python')
```

```java
System.out.println('java')
```

```json
{
	"firstName": "A",
	"lastName": "B",
	"age": 18
}
```

<!-- diff allows you to mimic the way git displays changes in code -->

```diff
+ added this bit of code
- removed this bit of code

```
````

```js
console.log('javascript')
```

```md
# Heading 1

## Heading 2

### Heading 3
```

```python
print('python')
```

```java
System.out.println('java')
```

```json
{
	"firstName": "A",
	"lastName": "B",
	"age": 18
}
```

```diff
+ added this bit of code
- removed this bit of code

```
