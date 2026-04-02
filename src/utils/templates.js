export const templates = [
  {
    name: 'Hello World',
    icon: '👋',
    code: `// Hello World
console.log("Hello, World!");
console.log("Welcome to JS Playground!");`,
  },
  {
    name: 'Variables & Types',
    icon: '📦',
    code: `// Variables and Data Types
const name = "JavaScript";
let version = 2024;
const isAwesome = true;
const nothing = null;
let notDefined;

console.log("Language:", name);
console.log("Version:", version);
console.log("Is Awesome:", isAwesome);
console.log("Null value:", nothing);
console.log("Undefined:", notDefined);
console.log("Type of name:", typeof name);
console.log("Type of version:", typeof version);`,
  },
  {
    name: 'Array Methods',
    icon: '📋',
    code: `// Array Methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map - transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter - keep elements that pass a test
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Find - first element matching condition
const firstOver5 = numbers.find(n => n > 5);
console.log("First > 5:", firstOver5);

// Some & Every
console.log("Has even?", numbers.some(n => n % 2 === 0));
console.log("All positive?", numbers.every(n => n > 0));

// Sort, Reverse, Flat
const nested = [[1, 2], [3, 4], [5]];
console.log("Flattened:", nested.flat());`,
  },
  {
    name: 'Objects & Destructuring',
    icon: '🏗️',
    code: `// Objects & Destructuring
const person = {
  name: "Alice",
  age: 30,
  skills: ["JavaScript", "React", "Node.js"],
  address: {
    city: "San Francisco",
    country: "USA"
  }
};

// Destructuring
const { name, age, skills, address: { city } } = person;
console.log(\`\${name}, \${age}, from \${city}\`);

// Spread operator
const updatedPerson = { ...person, age: 31, role: "Senior Dev" };
console.log("Updated:", updatedPerson);

// Object methods
console.log("Keys:", Object.keys(person));
console.log("Values:", Object.values(person));
console.log("Entries:", Object.entries(person));

// Optional chaining
console.log("Zip:", person.address?.zip ?? "Not specified");`,
  },
  {
    name: 'Promises & Async',
    icon: '⏳',
    code: `// Promises & Async/Await
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ id: 1, name: "Product", price: 29.99 });
  }, 500);
});

// Async/Await
async function main() {
  console.log("⏳ Fetching data...");
  const data = await fetchData();
  console.log("✅ Data received:", data);

  // Promise.all
  console.log("⏳ Running parallel tasks...");
  const results = await Promise.all([
    delay(300).then(() => "Task 1 done"),
    delay(200).then(() => "Task 2 done"),
    delay(100).then(() => "Task 3 done"),
  ]);
  console.log("✅ All tasks:", results);
}

main();`,
  },
  {
    name: 'Classes & OOP',
    icon: '🎓',
    code: `// Classes & Object-Oriented Programming
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(\`\${this.name} says \${this.sound}!\`);
  }

  toString() {
    return \`[\${this.constructor.name}: \${this.name}]\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof");
    this.breed = breed;
  }

  fetch(item) {
    console.log(\`\${this.name} fetches the \${item}! 🎾\`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "Meow");
    this.lives = 9;
  }

  purr() {
    console.log(\`\${this.name} purrs... 😺\`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");

dog.speak();
dog.fetch("ball");
cat.speak();
cat.purr();

console.log(dog.toString());
console.log(\`\${cat.name} has \${cat.lives} lives\`);`,
  },
  {
    name: 'Error Handling',
    icon: '🛡️',
    code: `// Error Handling
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}

// Try-Catch-Finally
try {
  console.log("10 / 2 =", divide(10, 2));
  console.log("10 / 0 =", divide(10, 0));
} catch (error) {
  if (error instanceof RangeError) {
    console.error("Range Error:", error.message);
  } else if (error instanceof TypeError) {
    console.error("Type Error:", error.message);
  } else {
    console.error("Unknown Error:", error.message);
  }
} finally {
  console.log("Division operations complete.");
}

// Custom Error
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

try {
  throw new ValidationError("email", "Invalid email format");
} catch (e) {
  console.error(\`\${e.name} on \${e.field}: \${e.message}\`);
}`,
  },
  {
    name: 'Closures & HOF',
    icon: '🔄',
    code: `// Closures & Higher-Order Functions

// Closure - counter
function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => { count = initial; return count; }
  };
}

const counter = createCounter(10);
console.log("Start:", counter.getCount());
console.log("++", counter.increment());
console.log("++", counter.increment());
console.log("--", counter.decrement());
console.log("Reset:", counter.reset());

// Higher-Order Function - memoize
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(\`  Cache hit for \${key}\`);
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log(\`  Computing fib(\${n})...\`);
  if (n <= 1) return n;
  return n * (n - 1);
});

console.log("\\nMemoized function:");
console.log("Result:", expensiveCalc(5));
console.log("Result:", expensiveCalc(5));
console.log("Result:", expensiveCalc(10));`,
  },
  {
    name: 'Fetch API',
    icon: '🌐',
    code: `// Fetch API Example
async function fetchUsers() {
  try {
    console.log("⏳ Fetching users...");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    
    console.log(\`✅ Found \${users.length} users:\\n\`);
    users.slice(0, 5).forEach(user => {
      console.log(\`  👤 \${user.name} (@\${user.username})\`);
      console.log(\`     📧 \${user.email}\`);
      console.log(\`     🏢 \${user.company.name}\\n\`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

fetchUsers();`,
  },
  {
    name: 'Generators & Iterators',
    icon: '🔁',
    code: `// Generators & Iterators

// Fibonacci generator
function* fibonacci(limit = 10) {
  let [a, b] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log("Fibonacci sequence:");
console.log([...fibonacci(10)]);

// Range generator
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log("\\nRange(0, 20, 3):");
console.log([...range(0, 20, 3)]);

// Infinite ID generator
function* idGenerator(prefix = "ID") {
  let id = 1;
  while (true) {
    yield \`\${prefix}-\${String(id++).padStart(4, "0")}\`;
  }
}

const genId = idGenerator("USR");
console.log("\\nGenerated IDs:");
for (let i = 0; i < 5; i++) {
  console.log(genId.next().value);
}`,
  },
  {
    name: 'Map, Set & WeakRef',
    icon: '🗃️',
    code: `// Map, Set, and Modern Collections

// Map - ordered key-value pairs
const userRoles = new Map();
userRoles.set("alice", "admin");
userRoles.set("bob", "editor");
userRoles.set("charlie", "viewer");

console.log("User Roles Map:");
userRoles.forEach((role, user) => {
  console.log(\`  \${user} → \${role}\`);
});
console.log("Alice's role:", userRoles.get("alice"));

// Set - unique values
const tags = new Set(["js", "react", "node", "js", "react"]);
console.log("\\nUnique tags:", [...tags]);
tags.add("typescript");
console.log("Has 'react':", tags.has("react"));
console.log("Size:", tags.size);

// Set operations
const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);

const union = new Set([...setA, ...setB]);
const intersection = new Set([...setA].filter(x => setB.has(x)));
const difference = new Set([...setA].filter(x => !setB.has(x)));

console.log("\\nSet Operations:");
console.log("A:", [...setA]);
console.log("B:", [...setB]);
console.log("Union:", [...union]);
console.log("Intersection:", [...intersection]);
console.log("Difference:", [...difference]);`,
  },
];
