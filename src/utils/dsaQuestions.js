export const dsaCategories = [
  { id: 'arrays', name: 'Arrays', icon: '📊' },
  { id: 'strings', name: 'Strings', icon: '🔤' },
  { id: 'linkedlist', name: 'Linked List', icon: '🔗' },
  { id: 'stack-queue', name: 'Stack & Queue', icon: '📚' },
  { id: 'trees', name: 'Trees', icon: '🌳' },
  { id: 'sorting', name: 'Sorting', icon: '🔀' },
  { id: 'searching', name: 'Searching', icon: '🔍' },
  { id: 'recursion', name: 'Recursion', icon: '🔄' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🧩' },
  { id: 'graphs', name: 'Graphs', icon: '🕸️' },
  { id: 'hashing', name: 'Hashing', icon: '#️⃣' },
  { id: 'math', name: 'Math & Logic', icon: '🧮' },
];

export const dsaQuestions = [
  // ===== ARRAYS =====
  {
    id: 'two-sum', category: 'arrays', difficulty: 'Easy', title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: `Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]`,
    starterCode: `function twoSum(nums, target) {\n  // Your code here\n}\n\n// Test cases\nconsole.log(twoSum([2,7,11,15], 9)); // [0,1]\nconsole.log(twoSum([3,2,4], 6));      // [1,2]\nconsole.log(twoSum([3,3], 6));        // [0,1]`,
    solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
  },
  {
    id: 'max-subarray', category: 'arrays', difficulty: 'Medium', title: 'Maximum Subarray (Kadane\'s)',
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: `Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.`,
    starterCode: `function maxSubArray(nums) {\n  // Your code here (Kadane's Algorithm)\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6\nconsole.log(maxSubArray([1]));                       // 1\nconsole.log(maxSubArray([5,4,-1,7,8]));              // 23`,
    solution: `function maxSubArray(nums) {\n  let maxSum = nums[0], currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}`,
  },
  {
    id: 'rotate-array', category: 'arrays', difficulty: 'Medium', title: 'Rotate Array',
    description: `Given an integer array nums, rotate the array to the right by k steps.`,
    examples: `Input: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]`,
    starterCode: `function rotate(nums, k) {\n  // Your code here - modify in place\n}\n\nlet arr1 = [1,2,3,4,5,6,7];\nrotate(arr1, 3);\nconsole.log(arr1); // [5,6,7,1,2,3,4]`,
    solution: `function rotate(nums, k) {\n  k = k % nums.length;\n  const reverse = (l, r) => {\n    while (l < r) [nums[l], nums[r]] = [nums[r], nums[l]], l++, r--;\n  };\n  reverse(0, nums.length - 1);\n  reverse(0, k - 1);\n  reverse(k, nums.length - 1);\n}`,
  },
  {
    id: 'merge-sorted', category: 'arrays', difficulty: 'Easy', title: 'Merge Two Sorted Arrays',
    description: `Given two sorted arrays, merge them into one sorted array.`,
    examples: `Input: arr1 = [1,3,5], arr2 = [2,4,6]\nOutput: [1,2,3,4,5,6]`,
    starterCode: `function mergeSorted(arr1, arr2) {\n  // Your code here\n}\n\nconsole.log(mergeSorted([1,3,5], [2,4,6])); // [1,2,3,4,5,6]\nconsole.log(mergeSorted([1,2], [3,4,5]));   // [1,2,3,4,5]`,
    solution: `function mergeSorted(arr1, arr2) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < arr1.length && j < arr2.length) {\n    if (arr1[i] <= arr2[j]) result.push(arr1[i++]);\n    else result.push(arr2[j++]);\n  }\n  return [...result, ...arr1.slice(i), ...arr2.slice(j)];\n}`,
  },
  // ===== STRINGS =====
  {
    id: 'reverse-string', category: 'strings', difficulty: 'Easy', title: 'Reverse String',
    description: `Write a function that reverses a string. The input string is given as an array of characters.`,
    examples: `Input: ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]`,
    starterCode: `function reverseString(s) {\n  // Your code here - modify in place\n}\n\nlet s1 = ["h","e","l","l","o"];\nreverseString(s1);\nconsole.log(s1); // ["o","l","l","e","h"]`,
    solution: `function reverseString(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    [s[l], s[r]] = [s[r], s[l]];\n    l++; r--;\n  }\n}`,
  },
  {
    id: 'valid-anagram', category: 'strings', difficulty: 'Easy', title: 'Valid Anagram',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.`,
    examples: `Input: s = "anagram", t = "nagaram" → true\nInput: s = "rat", t = "car" → false`,
    starterCode: `function isAnagram(s, t) {\n  // Your code here\n}\n\nconsole.log(isAnagram("anagram", "nagaram")); // true\nconsole.log(isAnagram("rat", "car"));         // false`,
    solution: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}`,
  },
  {
    id: 'longest-substring', category: 'strings', difficulty: 'Medium', title: 'Longest Substring Without Repeating',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: `Input: "abcabcbb" → 3 ("abc")\nInput: "bbbbb" → 1 ("b")\nInput: "pwwkew" → 3 ("wke")`,
    starterCode: `function lengthOfLongestSubstring(s) {\n  // Your code here (Sliding Window)\n}\n\nconsole.log(lengthOfLongestSubstring("abcabcbb")); // 3\nconsole.log(lengthOfLongestSubstring("bbbbb"));    // 1\nconsole.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
    solution: `function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let l = 0, maxLen = 0;\n  for (let r = 0; r < s.length; r++) {\n    while (set.has(s[r])) set.delete(s[l++]);\n    set.add(s[r]);\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}`,
  },
  {
    id: 'valid-palindrome', category: 'strings', difficulty: 'Easy', title: 'Valid Palindrome',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    examples: `Input: "A man, a plan, a canal: Panama" → true\nInput: "race a car" → false`,
    starterCode: `function isPalindrome(s) {\n  // Your code here\n}\n\nconsole.log(isPalindrome("A man, a plan, a canal: Panama")); // true\nconsole.log(isPalindrome("race a car")); // false`,
    solution: `function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let l = 0, r = clean.length - 1;\n  while (l < r) {\n    if (clean[l++] !== clean[r--]) return false;\n  }\n  return true;\n}`,
  },
  // ===== LINKED LIST =====
  {
    id: 'reverse-linkedlist', category: 'linkedlist', difficulty: 'Easy', title: 'Reverse Linked List',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: `Input: 1 -> 2 -> 3 -> 4 -> 5\nOutput: 5 -> 4 -> 3 -> 2 -> 1`,
    starterCode: `class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\n\nfunction reverseList(head) {\n  // Your code here\n}\n\n// Helper to create & print list\nfunction createList(arr) {\n  let head = null;\n  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);\n  return head;\n}\nfunction printList(head) {\n  const vals = [];\n  while (head) { vals.push(head.val); head = head.next; }\n  console.log(vals.join(" -> "));\n}\n\nconst list = createList([1,2,3,4,5]);\nprintList(reverseList(list)); // 5 -> 4 -> 3 -> 2 -> 1`,
    solution: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,
  },
  {
    id: 'detect-cycle', category: 'linkedlist', difficulty: 'Medium', title: 'Detect Cycle in Linked List',
    description: `Given head, determine if the linked list has a cycle in it. Use Floyd's cycle detection (tortoise and hare).`,
    examples: `Input: 3 -> 2 -> 0 -> -4 -> (back to 2)\nOutput: true`,
    starterCode: `class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\n\nfunction hasCycle(head) {\n  // Your code here (Floyd's Algorithm)\n}\n\n// Test: create cycle\nconst n1 = new ListNode(3);\nconst n2 = new ListNode(2);\nconst n3 = new ListNode(0);\nconst n4 = new ListNode(-4);\nn1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2;\nconsole.log(hasCycle(n1)); // true\n\nconst n5 = new ListNode(1, new ListNode(2));\nconsole.log(hasCycle(n5)); // false`,
    solution: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`,
  },
  // ===== STACK & QUEUE =====
  {
    id: 'valid-parentheses', category: 'stack-queue', difficulty: 'Easy', title: 'Valid Parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: `Input: "()[]{}" → true\nInput: "(]" → false\nInput: "([)]" → false`,
    starterCode: `function isValid(s) {\n  // Your code here (use Stack)\n}\n\nconsole.log(isValid("()[]{}"));  // true\nconsole.log(isValid("(]"));      // false\nconsole.log(isValid("([)]"));    // false\nconsole.log(isValid("{[]}"));    // true`,
    solution: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (map[c]) {\n      if (stack.pop() !== map[c]) return false;\n    } else stack.push(c);\n  }\n  return stack.length === 0;\n}`,
  },
  {
    id: 'min-stack', category: 'stack-queue', difficulty: 'Medium', title: 'Min Stack',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    examples: `MinStack minStack = new MinStack();\nminStack.push(-2); minStack.push(0); minStack.push(-3);\nminStack.getMin(); // -3\nminStack.pop();\nminStack.top();    // 0\nminStack.getMin(); // -2`,
    starterCode: `class MinStack {\n  constructor() {\n    // Your code here\n  }\n  push(val) { /* Your code */ }\n  pop() { /* Your code */ }\n  top() { /* Your code */ }\n  getMin() { /* Your code */ }\n}\n\nconst ms = new MinStack();\nms.push(-2); ms.push(0); ms.push(-3);\nconsole.log("Min:", ms.getMin()); // -3\nms.pop();\nconsole.log("Top:", ms.top());    // 0\nconsole.log("Min:", ms.getMin()); // -2`,
    solution: `class MinStack {\n  constructor() { this.stack = []; this.minStack = []; }\n  push(val) {\n    this.stack.push(val);\n    this.minStack.push(Math.min(val, this.minStack.length ? this.minStack[this.minStack.length-1] : val));\n  }\n  pop() { this.stack.pop(); this.minStack.pop(); }\n  top() { return this.stack[this.stack.length - 1]; }\n  getMin() { return this.minStack[this.minStack.length - 1]; }\n}`,
  },
  // ===== TREES =====
  {
    id: 'max-depth-tree', category: 'trees', difficulty: 'Easy', title: 'Maximum Depth of Binary Tree',
    description: `Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).`,
    examples: `Input: [3,9,20,null,null,15,7]\nOutput: 3`,
    starterCode: `class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val; this.left = left; this.right = right;\n  }\n}\n\nfunction maxDepth(root) {\n  // Your code here\n}\n\nconst tree = new TreeNode(3,\n  new TreeNode(9),\n  new TreeNode(20, new TreeNode(15), new TreeNode(7))\n);\nconsole.log(maxDepth(tree)); // 3\nconsole.log(maxDepth(null)); // 0`,
    solution: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
  },
  {
    id: 'inorder-traversal', category: 'trees', difficulty: 'Easy', title: 'Binary Tree Inorder Traversal',
    description: `Given the root of a binary tree, return the inorder traversal (Left, Root, Right) of its nodes' values.`,
    examples: `Input: [1,null,2,3]\nOutput: [1,3,2]`,
    starterCode: `class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val; this.left = left; this.right = right;\n  }\n}\n\nfunction inorderTraversal(root) {\n  // Your code here\n}\n\nconst tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));\nconsole.log(inorderTraversal(tree)); // [1,3,2]`,
    solution: `function inorderTraversal(root) {\n  const result = [];\n  const traverse = (node) => {\n    if (!node) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  };\n  traverse(root);\n  return result;\n}`,
  },
  // ===== SORTING =====
  {
    id: 'bubble-sort', category: 'sorting', difficulty: 'Easy', title: 'Bubble Sort',
    description: `Implement bubble sort algorithm. Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.`,
    examples: `Input: [64, 34, 25, 12, 22, 11, 90]\nOutput: [11, 12, 22, 25, 34, 64, 90]`,
    starterCode: `function bubbleSort(arr) {\n  // Your code here\n}\n\nconsole.log(bubbleSort([64,34,25,12,22,11,90]));\n// [11, 12, 22, 25, 34, 64, 90]`,
    solution: `function bubbleSort(arr) {\n  const a = [...arr];\n  for (let i = 0; i < a.length; i++) {\n    for (let j = 0; j < a.length - i - 1; j++) {\n      if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];\n    }\n  }\n  return a;\n}`,
  },
  {
    id: 'merge-sort', category: 'sorting', difficulty: 'Medium', title: 'Merge Sort',
    description: `Implement merge sort - a divide and conquer algorithm that splits the array, sorts each half, then merges them.`,
    examples: `Input: [38, 27, 43, 3, 9, 82, 10]\nOutput: [3, 9, 10, 27, 38, 43, 82]`,
    starterCode: `function mergeSort(arr) {\n  // Your code here\n}\n\nconsole.log(mergeSort([38,27,43,3,9,82,10]));\n// [3, 9, 10, 27, 38, 43, 82]`,
    solution: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}`,
  },
  {
    id: 'quick-sort', category: 'sorting', difficulty: 'Medium', title: 'Quick Sort',
    description: `Implement quick sort using a pivot element to partition the array into two halves.`,
    examples: `Input: [10, 7, 8, 9, 1, 5]\nOutput: [1, 5, 7, 8, 9, 10]`,
    starterCode: `function quickSort(arr) {\n  // Your code here\n}\n\nconsole.log(quickSort([10,7,8,9,1,5]));\n// [1, 5, 7, 8, 9, 10]`,
    solution: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = [], right = [];\n  for (let i = 0; i < arr.length - 1; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`,
  },
  // ===== SEARCHING =====
  {
    id: 'binary-search', category: 'searching', difficulty: 'Easy', title: 'Binary Search',
    description: `Given a sorted array of integers and a target, return the index of the target. If not found, return -1.`,
    examples: `Input: nums = [-1,0,3,5,9,12], target = 9 → 4\nInput: nums = [-1,0,3,5,9,12], target = 2 → -1`,
    starterCode: `function binarySearch(nums, target) {\n  // Your code here\n}\n\nconsole.log(binarySearch([-1,0,3,5,9,12], 9));  // 4\nconsole.log(binarySearch([-1,0,3,5,9,12], 2));  // -1`,
    solution: `function binarySearch(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    nums[mid] < target ? l = mid + 1 : r = mid - 1;\n  }\n  return -1;\n}`,
  },
  // ===== RECURSION =====
  {
    id: 'fibonacci', category: 'recursion', difficulty: 'Easy', title: 'Fibonacci Number',
    description: `The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones. F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).`,
    examples: `F(0) = 0, F(1) = 1, F(2) = 1, F(3) = 2, F(4) = 3, F(10) = 55`,
    starterCode: `function fib(n) {\n  // Your code here\n}\n\nfor (let i = 0; i <= 10; i++) {\n  console.log(\`F(\${i}) = \${fib(i)}\`);\n}`,
    solution: `function fib(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}`,
  },
  {
    id: 'power-of-two', category: 'recursion', difficulty: 'Easy', title: 'Power of Two',
    description: `Given an integer n, return true if it is a power of two. Otherwise, return false.`,
    examples: `Input: 1 → true, 16 → true, 3 → false`,
    starterCode: `function isPowerOfTwo(n) {\n  // Your code here (recursive)\n}\n\nconsole.log(isPowerOfTwo(1));  // true\nconsole.log(isPowerOfTwo(16)); // true\nconsole.log(isPowerOfTwo(3));  // false`,
    solution: `function isPowerOfTwo(n) {\n  if (n <= 0) return false;\n  if (n === 1) return true;\n  return n % 2 === 0 && isPowerOfTwo(n / 2);\n}`,
  },
  // ===== DYNAMIC PROGRAMMING =====
  {
    id: 'climbing-stairs', category: 'dynamic-programming', difficulty: 'Easy', title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: `Input: n = 2 → 2 (1+1 or 2)\nInput: n = 3 → 3 (1+1+1, 1+2, 2+1)`,
    starterCode: `function climbStairs(n) {\n  // Your code here\n}\n\nfor (let i = 1; i <= 10; i++) {\n  console.log(\`Stairs(\${i}) = \${climbStairs(i)}\`);\n}`,
    solution: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}`,
  },
  {
    id: 'coin-change', category: 'dynamic-programming', difficulty: 'Medium', title: 'Coin Change',
    description: `Given coins of different denominations and a total amount, return the fewest number of coins needed to make up that amount. If impossible, return -1.`,
    examples: `Input: coins = [1,5,10,25], amount = 30 → 2 (25+5)\nInput: coins = [2], amount = 3 → -1`,
    starterCode: `function coinChange(coins, amount) {\n  // Your code here\n}\n\nconsole.log(coinChange([1,5,10,25], 30)); // 2\nconsole.log(coinChange([1,2,5], 11));     // 3\nconsole.log(coinChange([2], 3));           // -1`,
    solution: `function coinChange(coins, amount) {\n  const dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
  },
  // ===== GRAPHS =====
  {
    id: 'bfs-graph', category: 'graphs', difficulty: 'Medium', title: 'BFS Graph Traversal',
    description: `Implement Breadth-First Search (BFS) on an adjacency list graph, starting from a given node.`,
    examples: `Graph: { A: [B,C], B: [D], C: [E], D: [], E: [] }\nBFS from A → [A, B, C, D, E]`,
    starterCode: `function bfs(graph, start) {\n  // Your code here\n}\n\nconst graph = {\n  A: ['B', 'C'],\n  B: ['D'],\n  C: ['E'],\n  D: [],\n  E: ['F'],\n  F: []\n};\nconsole.log(bfs(graph, 'A')); // [A, B, C, D, E, F]`,
    solution: `function bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  const result = [];\n  while (queue.length) {\n    const node = queue.shift();\n    result.push(node);\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return result;\n}`,
  },
  {
    id: 'dfs-graph', category: 'graphs', difficulty: 'Medium', title: 'DFS Graph Traversal',
    description: `Implement Depth-First Search (DFS) on an adjacency list graph.`,
    examples: `Graph: { A: [B,C], B: [D], C: [E], D: [], E: [] }\nDFS from A → [A, B, D, C, E]`,
    starterCode: `function dfs(graph, start) {\n  // Your code here\n}\n\nconst graph = {\n  A: ['B', 'C'],\n  B: ['D'],\n  C: ['E'],\n  D: [],\n  E: ['F'],\n  F: []\n};\nconsole.log(dfs(graph, 'A')); // [A, B, D, C, E, F]`,
    solution: `function dfs(graph, start) {\n  const visited = new Set();\n  const result = [];\n  const traverse = (node) => {\n    if (visited.has(node)) return;\n    visited.add(node);\n    result.push(node);\n    for (const neighbor of graph[node] || []) traverse(neighbor);\n  };\n  traverse(start);\n  return result;\n}`,
  },
  // ===== HASHING =====
  {
    id: 'group-anagrams', category: 'hashing', difficulty: 'Medium', title: 'Group Anagrams',
    description: `Given an array of strings, group the anagrams together. An Anagram is a word formed by rearranging the letters of a different word.`,
    examples: `Input: ["eat","tea","tan","ate","nat","bat"]\nOutput: [["eat","tea","ate"],["tan","nat"],["bat"]]`,
    starterCode: `function groupAnagrams(strs) {\n  // Your code here\n}\n\nconsole.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
    solution: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = [...s].sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return [...map.values()];\n}`,
  },
  {
    id: 'first-unique-char', category: 'hashing', difficulty: 'Easy', title: 'First Unique Character',
    description: `Given a string s, find the first non-repeating character and return its index. If it does not exist, return -1.`,
    examples: `Input: "leetcode" → 0\nInput: "loveleetcode" → 2\nInput: "aabb" → -1`,
    starterCode: `function firstUniqChar(s) {\n  // Your code here\n}\n\nconsole.log(firstUniqChar("leetcode"));     // 0\nconsole.log(firstUniqChar("loveleetcode")); // 2\nconsole.log(firstUniqChar("aabb"));         // -1`,
    solution: `function firstUniqChar(s) {\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (let i = 0; i < s.length; i++) {\n    if (count[s[i]] === 1) return i;\n  }\n  return -1;\n}`,
  },
  // ===== MATH =====
  {
    id: 'is-prime', category: 'math', difficulty: 'Easy', title: 'Check Prime Number',
    description: `Write a function to check if a number is prime. A prime number is only divisible by 1 and itself.`,
    examples: `isPrime(7) → true\nisPrime(10) → false\nisPrime(29) → true`,
    starterCode: `function isPrime(n) {\n  // Your code here\n}\n\n[2,3,4,7,10,17,29,100].forEach(n => {\n  console.log(\`\${n} → \${isPrime(n) ? 'Prime' : 'Not Prime'}\`);\n});`,
    solution: `function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}`,
  },
  {
    id: 'gcd-lcm', category: 'math', difficulty: 'Easy', title: 'GCD and LCM',
    description: `Implement functions for Greatest Common Divisor (GCD) and Least Common Multiple (LCM) using Euclidean algorithm.`,
    examples: `GCD(12, 8) = 4\nLCM(12, 8) = 24`,
    starterCode: `function gcd(a, b) {\n  // Your code here (Euclidean algorithm)\n}\n\nfunction lcm(a, b) {\n  // Your code here\n}\n\nconsole.log("GCD(12,8):", gcd(12, 8));   // 4\nconsole.log("LCM(12,8):", lcm(12, 8));   // 24\nconsole.log("GCD(54,24):", gcd(54, 24)); // 6`,
    solution: `function gcd(a, b) {\n  return b === 0 ? a : gcd(b, a % b);\n}\nfunction lcm(a, b) {\n  return (a * b) / gcd(a, b);\n}`,
  },
];
