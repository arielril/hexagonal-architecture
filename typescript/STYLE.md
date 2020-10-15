# Style Guide - Typescript (Remake)

## Files

- All Typescript files MUST have a `.ts` or `.tsx` extension
- They SHOULD be all camel case (`myLittleFile`), and only include letters and numbers
- **All files MUST end with a new line**

## Indentation

- The indentation MUST be of `2 spaces`

## Line Length

- Lines MUST NOT be longer than 100 characters
- When a statement runs over 100 line length on a line, it MUST be broken up, ideally after a new comma or operator

## Quotes

- ALWAYS use single-quotes `''` for all strings, and use double-quotes `""` for strings within strings
- Use template literals when using expression interpolation `${}`

```typescript
// 🚫 bad
const greeting = "Hello World!";

// ✅ good
const greeting = "Hello World!";

// 🚫 bad
const phrase = "It's Friday!";

// ✅ good
const phrase = "It's Friday!";

// 🚫 bad
const html = "<div class='bold'>Hello World</div>";

// 🚫 bad
const html = "<div class='bold'>Hello World</div>";

// ✅ good
const html = '<div class="bold">Hello World</div>';

// 🚫 bad
const template = `string text string text`;

// ✅ good
const template = `string text ${expression} string text`;
```

## Commas

- ALWAYS use trailing commas. DO NOT use leading commas
- ALWAYS use an additional trailing comma

```typescript
// 🚫 bad
const person = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@outlook.com"
};

// 🚫 bad
const person = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@outlook.com"
};

// ✅ good
const person = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@outlook.com"
};
```

## Comments

- Comments are strongly encouraged. It is ver useful to be able to read comments and understand the intentions of a given block of code
- Comments need to be clear, just like the code they are annotating
- Make sure comments are <u>**meaningful**</u>

The following example is a case where a comment is completely erroneous, and can actually make the code harder to read.

```typescript
// Set index to zero.
let index = 0;
```

- All public functions MUST have a comment block `/**....*/` using JSDoc style comments.

JSDoc can be interpreted by IDEs for better intellisense. Below is an example of a JSDoc comment block for a function.

```typescript
/**
 * Takes in a name and returns a greeting string.
 *
 * @param name The name of the greeted person.
 */
function getGreeting(name: string): string {
  return `Hello ${name}!`;
}
```

![Screen Shot 2020-01-02 at 10.34.36 AM.png](https://storage.googleapis.com/slite-api-files-production/files/1c253b34-1d59-4f56-8144-392a8a103999/Screen%2520Shot%25202020-01-02%2520at%252010.34.36%2520AM.png)

### Inline Comments

- Inline comments are comments inside of complex statements (loops, functions, etc.)
- use `//` for all inline comments
- Keep comments clear and concise
- Put an empty line before the comment

```typescript
// bad
let lines: Array<string>; // Holds all the lines in the file.

// good
// Holds all the lines in the file.
let lines: Array<string>;

// ------------------------------------------------------------------
// bad
function walkFor(name: string, millis: number): void {
  console.log(`${name} is now walking.`);
  // Wait for millis milliseconds to stop walking
  setTimeout(() => {
    console.log(`${name} has stopped walking.`);
  }, millis);
}

// good
function walkFor(name: string, millis: number): void {
  console.log(`${name} is now walking.`);

  // Wait for millis milliseconds to stop walking
  setTimeout(() => {
    console.log(`${name} has stopped walking.`);
  }, millis);
}
```

### TODO Comments

`TODO` and `XXX` annotations help you quickly find things that need to be fixed/implemented

- Use `// TODO:` to annotate solutions that need to be implemented
- Use `// XXX:` to annotate problems that need to be fixed
- It is best to write code that doesn't need `TODO` and `XXX` annotations, but sometimes it is unavoidable

## Variable Declarations

- All variables MUST be declared prior to using them. This aids readability and helps prevent undeclared variables from being hoisted onto the global scope

```typescript
// bad
console.log(a + b);

const a = 2;
const b = 4;

// ------------------------------------------------------------------
// good
const a = 2;
const b = 4;

console.log(a + b);
```

- Declare each variable on a new line
- Use `let` or `const` to declare each variable. For constant variables, that never are changed, you MUST use `const` , otherwise you SHOULD use `let`

```typescript
// bad
const a = 2,
  b = 2,
  c = 4;

// bad
// b will be defined on global scope.
const a = (b = 2),
  c = 4;

// good
const a = 2;
const b = 2;
const c = 4;

// good
let someVariable = "Ariel";
console.log(`Hey, ${someVariable}`);

someVariable = "Eduardo";
console.log(`Hey, ${someVariable}`);
```

## Function Declaration

- All functions MUST be declared before they are used
- There SHOULD be no space between the name of the function and the left parenthesis `(` of its parameter list
- There SHOULD be one space between the right parenthesis `)` and the left curly `{` brace that begins the statement body

```typescript
// bad
function foo() {
  // ...
}

// good
function foo() {
  // ...
}
```

- The right curly brace `}` MUST be on a new line
- The right curly brace `}` SHOULD be aligned with the line containing the left curly brace `{` that begins the function statement

```typescript
// bad
function foo(): string {
  return "foo";
}

// good
function foo(): string {
  return "foo";
}
```

- For each function parameter
  - There should be no space between the parameter and the colo `:` indication the type declaration
  - There SHOULD be a space between the colon `:` and the type declaration

```typescript
// bad
function greet(name: string) {
  // ...
}

// good
function greet(name: string) {
  // ...
}
```

## Anonymous Functions

- All anonymous functions MUST be defined as fat-arrow/lambda `() => { }` functions unless it is absolutely necessary to preserve the context in the function body
- All fat-arrow/lambda functions MUST have parenthesis `()` around the function parameters

```typescript
// bad
clickAlert() {
  let element = document.querySelector('div');

  this.foo = 'foo';
  element.addEventListener('click', function(ev: Event) {
      // this.foo does not exist!
      alert(this.foo);
  });
}

// good
clickAlert() {
  let element = document.querySelector('div');

  this.foo = 'foo';
  element.addEventListener('click', (ev: Event) => {
      // TypeScript allows this.foo to exist!
      alert(this.foo);
  });
}
```

- Always surround the function block with braces `{}`

```typescript
// bad
element.addEventListener("submit", ev => ev.preventDefault());

// bad
element.addEventListener("submit", (ev: Event) => ev.preventDefault());

// good
element.addEventListener("submit", (ev: Event) => {
  ev.preventDefault();
});
```

- There MUST be a space between the right parenthesis `)` and the `=>`
- There MUST be a space between the `=>` and the left curly brace `{` that begins the statement body

```typescript
// bad
element.addEventListener("click", (ev: Event) => {
  alert("foo");
});

// good
element.addEventListener("click", (ev: Event) => {
  alert("foo");
});
```

## Names

- All variable and function names MUST be in camelCase, using only alphanumeric (`A-Z, a-z, 0-9`) values

### Variables, Modules and Functions

- Variables, Modules and Functions names MUST use lowerCamelCase

### Use of var, let, const

- Use `const` where appropriate, for <u>values that never change</u>
- Use `let` for variables that suffer from a change of value
- NEVER use `var`

### Types

- Always define the return type of functions. This can help catch errors as the functions evolve
- Types SHOULD be used whenever necessary. Use `unknown` over `any`
- Arrays SHOULD be defined as `type[]` instead of `Array<type>`

```typescript
// bad
let numbers = [];

// bad
let numbers: Array<number> = [];

// good
let numbers: number[] = [];
```

### Classes

- Classes/Constructors SHOULD use UpperCamelCase (PascalCase)
- `Private` and `private static` members in classes should be denoted with the `private` keyword
- Avoid using `protected` variables
- Use `public` instance members only when they are available in the Class Interface

```typescript
class HttpAdapter implements IHttpAdapter {
  private instance: AxiosInstance;

  constructor(public config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  send(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
}
```

### Interfaces

- Interfaces MUST use UpperCamelCase
- Interfaces MUST be prefaced with the capital letter `I`
- Only `public` members MUST be in an interface, leave out `protected` and `private` members

```typescript
interface ICardRepository {
  /**
   * Find card with the used filters
   * @param card
   */
  findCard(card: FindCardFilter): Promise<Card[]>;

  /**
   * Add the card provided for payment processing
   * @param card
   */
  addCard(card: Card): Promise<Card>;

  /**
   * Remove the card provided of processing payments
   * @param card
   */
  removeCard(card: Card): Promise<unknown>;
}
```

### Constants

- All constants MUST be defined with the `const` keyword

---

## Statements

### Simple

- Each line should contain at most one statement
- A semicolon `;` MUST be placed at the end of every simple statement

```typescript
// bad
let greeting = "Hello World";

alert(greeting);

// good
let greeting = "Hello World";

alert(greeting);
```

### Compound

Compound statements are statements containing lists of statements enclosed in curly braces `{}`

- The enclosed statements should start on a new line

```typescript
// bad
if (condition === true) {
  alert("Passed!");
}

// good
if (condition === true) {
  alert("Passed!");
}
```

- The left curly brace `{` should be at the end of the line that begins the compound statement
- The right curly brace `}` should align with the line containing the left curly brace `{`

```typescript
// bad
if (condition === true) {
  alert("Passed!");
}

// good
if (condition === true) {
  alert("Passed!");
}
```

- Braces `{}` MUST be used around all compound statements even if they are only single-line statements

```typescript
// bad
if (condition === true) alert("Passed!");

// bad
if (condition === true) alert("Passed!");

// good
if (condition === true) {
  alert("Passed!");
}
```

> If you do not add braces `{}` around compound statements, it makes very ease to accidentally introduce bugs

```typescript
if (condition === true) alert("Passed!");
return condition;
```

### Return

- If a `return` statement has a value you MUST NOT use parenthesis `()` around the value
- The return value expression MUST start on the same line as the `return` keyword

```typescript
// bad
return;
"Hello World!";

// bad
return "Hello World!";

// good
return "Hello World!";
```

- It is recommended to take a return-first approach whenever possible

```typescript
// bad
function getHighestNumber(a: number, b: number): number {
  let out = b;

  if (a >= b) {
    out = a;
  }
  return out;
}

// good
function getHighestNumber(a: number, b: number): number {
  if (a >= b) {
    return a;
  }
  return b;
}
```

- ALWAYS explicitly define the return type. This can help Typescript validate that you are always returning something that matches the correct type

```typescript
// bad
function getPerson(name: string) {
  return new Person(name);
}

// good
function getPerson(name: string): Person {
  return new Person(name);
}
```

### If

- Always be explicit in your `if` statement conditions

```typescript
// bad
function isString(str: any) {
  return !!str;
}

// good
function isString(str: any): str is string {
  return typeof str === "string";
}
```

> If statements should take the following form:

```
if (/* condition */) {
    // ...
}

if (/* condition */) {
    // ...
} else {
    // ...
}

if (/* condition */) {
    // ...
} else if (/* condition */) {
    // ...
} else {
    // ...
}
```

### Switch

Switch statements should have the following form:

```
switch (/* expression */) {
  case /* expression */:
      // ...
      /* termination */
  default:
      // ...
}
```

- Each switch group except default should end with `break` , `return` , or `throw`

### Try/Catch/Finally

Try statements should have the following form:

```
try {
    // ...
} catch (error: Error) {
    // ...
}

try {
    // ...
} catch (error: Error) {
    // ...
} finally {
    // ...
}
```

### Throw

- Throw statements should follow the same principles of the `return` , using for early error throwing

```typescript
verifyCard(card: Card): void {
  const schema = joi.object({
    provider: joi.object({
      name: joi.string()
        .valid(...Object.values(Providers))
        .required()
        .error(
          new Error(`Invalid card.provider value (${card.provider?.name}). Allowed: ${Object.values(Providers)}`),
        ),
    }).required(),
  });

  const validation = schema.validate(card, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
  });

  if (validation.error) {
    throw validation.error;
  }
}
```

## Object and Array Literals

- Use curly braces `{}` instead of `new Object()`
- Use brackets `[]` instead of `new Array()`

```typescript
// bad
const stringArray = new Array<string>();
const emptyObject = new Object();

// good
const stringArray: string[] = [];
const emptyObject: unknown = {};
```

## Destructuring

- Use Object destructuring when needed
- Use Array destructuring except when returning
- Use [ramda](https://ramdajs.com/) functions when necessary

```typescript
// bad
function toName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;

  if (isEmpty(lastName)) {
    if (isEmpty(firstName)) {
      return email;
    }

    return firstName;
  }

  return `${firstName} ${lastName}`;
}

// good
function toName({ firstName, lastName, email }) {
  if (isEmpty(lastName)) {
    if (isEmpty(firstName)) {
      return email;
    }

    return firstName;
  }

  return `${firstName} ${lastName}`;
}

// ------------------------------------------------------------------
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;

// ------------------------------------------------------------------
const obj = {
  a: {
    b: {
      c: {
        d: "some value here"
      }
    }
  }
};

// bad
const dValue = obj?.a?.b?.c?.d;

// good
const dValue = R.path(["a", "b", "c", "d"], obj);
```

## Assignment Expressions

- Assignment expressions inside of the condition block of `if` , `while` , and `do while` statements MUST be avoided

```typescript
// bad
while ((node = node.next)) {
  // ...
}

// good
while (typeof node === "object") {
  node = node.next;
  // ...
}
```

## === and !== Operators

- ALWAYS use `===` and `!==` operators
- NEVER use `==` or `!=` operators

## Promises and Async/Await

- Prefer on using `async/await` . There is no restriction on `Promise.then` and `Promise.catch`

```typescript
// bad
removeCard(msg: AmqpParsedMessage<RemoveCardMessageContent>) {
  const removeCardProps = {
    provider: {
      name: msg.content.provider,
      cardId: msg.content.providerCardId,
    },
  } as Card;

  await this.cardUseCase.removeCardForProcessing(
    removeCardProps,
    apmTrx,
  )
    .catch((err) => {
      throw err;
    });
}

// good
removeCard(msg: AmqpParsedMessage<RemoveCardMessageContent>) {
  const removeCardProps = {
    provider: {
      name: msg.content.provider,
      cardId: msg.content.providerCardId,
    },
  } as Card;

  try {
    await this.cardUseCase.removeCardForProcessing(
      removeCardProps,
      apmTrx,
    );
  } catch (e: Error) {
    throw new CustomError('Failed to remove card', e)
  }
```

## Typings

### External

- Typings are sometimes packaged with node modules, in this case you do not need to do anything
- Use `/types` for all external library declarations not included in `node_modules`
- Actively add/update/contribute typings when they are missing

### Internal

- Create declaration files `.d.ts` inside the `/types` folder inside the project
- Add `interfaces` and default `types` inside the `/types` folder
- Avoid creating types and interfaces directly inside the "logic file", whenever is possible
- Private interfaces/types, the ones that is only available/used inside the "logic file", create it inside the "logic file" without remorse
- Always define the return type of functions

```typescript
// bad
function sum(a: number, b: number) {
  return a + b;
}

// good
function sum(a: number, b: number): number {
  return a + b;
}
```

- Use Object property reference to create a new type that is a reference of an existing type

```typescript
// Bad
interface IPersonRequestFilters {
  id?: string;
  email?: string;
  documentType?: string;
  documentNumber?: string;
  documentEmitter?: string;
}

// Good
type PersonRequest = Partial<{
  name: object;
  birthDate: Person["birthDate"];
  email: Person["email"];
  documents: Omit<Document, "personId">[];
  phone: Phone;
}>;
```

- Do not hesitate on using the [Typescript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Create typing files for Major entities only

> Bad

![Screen Shot 2020-01-02 at 10.25.41 AM.png](https://storage.googleapis.com/slite-api-files-production/files/e650c8fc-5a0b-4dc5-a801-b0a0508d5056/Screen%2520Shot%25202020-01-02%2520at%252010.25.41%2520AM.png)

> Good

![Screen Shot 2020-01-02 at 10.25.58 AM.png](https://storage.googleapis.com/slite-api-files-production/files/e05f306a-d37d-48b8-9098-229b936b8de4/Screen%2520Shot%25202020-01-02%2520at%252010.25.58%2520AM.png)

## Tests

- Unit testing MUST be in a file with the name as `*.unit.test.*`
- Integration tests MUST be in a file with the name as `*.test.*` , without the `.unit.`
- Each test MUST create and destroy the environment needed for the test. Create: objects, database records, ...
- Each test MUST have the destruction needed for the test inside `it` scope

```typescript
// Bad
describe('#update', () => {
    beforeAll(async () => {
      // Environment creation
      await db('person').insert(createPerson);
      await db('document').insert(createDocument);
      await db('phone').insert(createPhone);
    });

    afterAll(async () => {
      // Environment deletion
      await db('document').whereIn('personId', [firstPersonId, secondPersonId]).del();
      await db('phone').whereIn('personId', [firstPersonId, secondPersonId]).del();
      await db('person').whereIn('id', [firstPersonId, secondPersonId]).del();
    });
})

// ------------------------------------------------------------------
// Good
describe('Update document', () => {
  it('update test', async () => {
    // Environment creation
    const person = makePerson();
    const personId = await personService.create(person) as string;

    const doc = makeDocument(personId);
    await documentService.create(doc);

    const binaryId = Uuid.stringToBinary(personId);
    const [insertedDocument] = await docModel.db.where({
      ...doc,
      personId: binaryId,
    }).then(R.map(docModel.fromDatabase));
    .
    .
    .
    expect(updatedDoc).not.toHaveProperty('number', insertedDocument.number);
    expect(updatedDoc).not.toHaveProperty('expirationDate', insertedDocument.expirationDate);

    // Environment deletion
    await documentService.delete(personId);
    return personService.delete(personId);
  })
})
```

## Database Migrations

- Create table -> create a file for each database table
- In the event that a schema column has a complex data structure, you MUST add a comment on the column

```typescript
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable("account", t => {
    t.json("filled").comment(
      "This field has all properties that the user already filled in the account"
    );
  });
}
```

## Resource Links

- [https://medium.com/better-programming/kiss-dry-and-code-principles-every-developer-should-follow-b77d89f51d74](https://medium.com/better-programming/kiss-dry-and-code-principles-every-developer-should-follow-b77d89f51d74)
- https://github.com/Platypi/style_typescript
