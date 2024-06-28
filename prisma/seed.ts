import { db } from "~/server/db";

async function main() {
  // Delete all data in the database
  await db.$executeRaw`TRUNCATE "User" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Problem" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Class" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Language" CASCADE;`;

  await db.user.createMany({
    data: [
      {
        name: "Alice",
        email: "Alice@gmail.com",
        emailVerified: "2024-06-17T08:52:49.007Z",
        role: "USER",
        password:
          "$2a$10$B5jRo23oWN/pS1ttOIVhcu4L23R00Poo3wJvkHO0pCgN2F7B1nKz.",
      },
      {
        name: "Bob",
        email: "Bob@gmail.com",
        emailVerified: "2024-06-17T08:52:49.007Z",
        role: "USER",
        password:
          "$2a$10$B5jRo23oWN/pS1ttOIVhcu4L23R00Poo3wJvkHO0pCgN2F7B1nKz.",
      },
      {
        name: "Charlie",
        email: "Charlie@gmail.com",
        emailVerified: "2024-06-17T08:52:49.007Z",
        role: "USER",
        password:
          "$2a$10$B5jRo23oWN/pS1ttOIVhcu4L23R00Poo3wJvkHO0pCgN2F7B1nKz.",
      },
      {
        name: "David",
        email: "David@gmail.com",
        emailVerified: "2024-06-17T08:52:49.007Z",
        role: "USER",
        password:
          "$2a$10$B5jRo23oWN/pS1ttOIVhcu4L23R00Poo3wJvkHO0pCgN2F7B1nKz.",
      },
      {
        name: "Eve",
        email: "Eve@gmail.com",
        emailVerified: "2024-06-17T08:52:49.007Z",
        role: "USER",
        password:
          "$2a$10$B5jRo23oWN/pS1ttOIVhcu4L23R00Poo3wJvkHO0pCgN2F7B1nKz.",
      },
    ],
  });

  await db.problem.createMany({
    data: [
      {
        title: "Two Sum",
        difficulty: "EASY",
        isPublic: true,
        description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]
</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]
</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p>`,
        solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element xxx and find if there is another value that equals to target−xtarget - xtarget−x.</p><p><strong>Implementation:</strong></p><p>class Solution {</p><p>public:</p><p>    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {</p><p>        for (int i = 0; i &lt; nums.size(); i++) {</p><p>            for (int j = i + 1; j &lt; nums.size(); j++) {</p><p>                if (nums[j] == target - nums[i]) {</p><p>                    return {i, j};</p><p>                }</p><p>            }</p><p>        }</p><p>        // Return an empty vector if no solution is found</p><p>        return {};</p><p>    }</p><p>};</p><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2)O(n^2)O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n)O(n)O(n) time. Therefore, the time complexity is O(n2)O(n^2)O(n2).</p></li><li><p>Space complexity: O(1)O(1)O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n)O(n)O(n) to O(1)O(1)O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n)O(n)O(n) time. However, lookup in a hash table should be amortized O(1)O(1)O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]target - nums[i]target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i]nums[i]nums[i] itself!</p><p><strong>Implementation:</strong></p><p>class Solution {</p><p>public:</p><p>    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {</p><p>        unordered_map&lt;int, int&gt; hash;</p><p>        for (int i = 0; i &lt; nums.size(); i++) {</p><p>            hash[nums[i]] = i;</p><p>        }</p><p>        for (int i = 0; i &lt; nums.size(); i++) {</p><p>            int complement = target - nums[i];</p><p>            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {</p><p>                return {i, hash[complement]};</p><p>            }</p><p>        }</p><p>        return {};</p><p>    }</p><p>};</p><p></p>`,
        testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "output": [0, 1]
  }
]`,
      },
      {
        title: "Add Two Numbers",
        difficulty: "MEDIUM",
        isPublic: true,
        description: `<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum&nbsp;as a linked list.</p><p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg" style="width: 483px; height: 342px;"><pre><code>Input: l1 = [2,4,3], l2 = [5,6,4]`,
        solution: `<h3>Approach 1: Elementary Math</h3><p><strong>Intuition</strong></p><p>Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of list, which contains the least-significant digit.</p><p><strong>Algorithm</strong></p><p>Just like how you would sum two numbers on a piece of paper, we begin by summing the least-significant digits, which is the head of l1l1l1 and l2l2l2. Since each digit is in the range of 0…90 \ldots 90…9, summing two digits may "overflow". For example 5+7=125 + 7 = 125+7=12. In this case, we set the current digit to 222 and bring over the carry = 1carry=1carry=1 to the next iteration. carrycarrycarry must be either 000 or 111 because the largest possible sum of two digits (including the carry) is 9+9+1=199 + 9 + 1 = 199+9+1=19.</p><p>The pseudocode is as following:</p><pre><code>Initialize current node to dummy head of the returning list.`,
        testcases: `
[
  {
    "input": {
      "l1": [2, 4, 3],
      "l2": [5, 6, 4]
    },
    "output": [7, 0, 8]
  },
  {
    "input": {
      "l1": [0],
      "l2": [0]
    },
    "output": [0]
  },
  {
    "input": {
      "l1": [9, 9, 9, 9, 9, 9, 9],
      "l2": [9, 9, 9, 9]
    },
    "output": [8, 9, 9, 9, 0, 0, 0, 1]
  }
]`,
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "MEDIUM",
        isPublic: true,
        description: `<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: s = "abcabcbb" Output: 3 Explanation: The answer is "abc", with the length of 3.`,
        testcases: `
[
  {
    "input": {
      "s": "abcabcbb"
    },
    "output": 3
  },
  {
    "input": {
      "s": "bbbbb"
    },
    "output": 1
  },
  {
    "input": {
      "s": "pwwkew"
    },
    "output": 3
  }
]`,
      },
      {
        title: "Median of Two Sorted Arrays",
        difficulty: "HARD",
        isPublic: true,
        description: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p><p>The overall run time complexity should be <code>O(log (m+n))</code>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums1 = [1,3], nums2 = [2] Output: 2.00000 Explanation: merged array = [1,2,3] and median is 2.`,
        testcases: `
[
  {
    "input": {
      "nums1": [1, 3],
      "nums2": [2]
    },
    "output": 2
  },
  {
    "input": {
      "nums1": [1, 2],
      "nums2": [3, 4]
    },
    "output": 2.5
  },
  {
    "input": {
      "nums1": [0, 0],
      "nums2": [0, 0]
    },
    "output": 0
  }
]`,
      },
      {
        title: "Longest Palindromic Substring",
        difficulty: "MEDIUM",
        isPublic: true,
        description: `<p>Given a string <code>s</code>, return&nbsp;<em>the longest palindromic substring</em>&nbsp;in <code>s</code>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: s = "babad" Output: "bab" Note: "aba" is also a valid answer.`,
        testcases: `
[
  {
    "input": {
      "s": "babad"
    },
    "output": "bab"
  },
  {
    "input": {
      "s": "cbbd"
    },
    "output": "bb"
  },
  {
    "input": {
      "s": "a"
    },
    "output": "a"
  }
]`,
      },
    ],
  });

  await db.class.createMany({
    data: [
      {
        name: "62TH3",
      },
      {
        name: "62TH4",
      },
      {
        name: "62TH5",
      },
      {
        name: "62NB",
      },
      {
        name: "62TH6_CPP_TLU_2024",
      },
    ],
  });

  await db.language.createMany({
    data: [
      {
        id: "15",
        name: "C++",
        editorValue: "cpp",
      },
      // {
      //   id: 51,
      //   name: "C#",
      //   editorValue: "csharp",
      // },
      {
        id: "91",
        name: "Java",
        editorValue: "java",
      },
      {
        id: "92",
        name: "Python",
        editorValue: "python",
      },
      {
        id: "93",
        name: "JavaScript",
        editorValue: "javascript",
      },
      // {
      //   id: 68,
      //   name: "PHP",
      //   editorValue: "php",
      // },
      // {
      //   id: 73,
      //   name: "Rust",
      //   editorValue: "rust",
      // },
      // {
      //   id: 95,
      //   name: "Go",
      //   editorValue: "go",
      // },
      {
        id: "94",
        name: "TypeScript",
        editorValue: "typescript",
      },
    ],
  });

  await db.topic.createMany({
    data: [
      {
        name: "Array",
      },
      {
        name: "String",
      },
      {
        name: "Hash Table",
      },
      {
        name: "Dynamic Programming",
      },
      {
        name: "Math",
      },
      {
        name: "Sorting",
      },
      {
        name: "Greedy",
      },
      {
        name: "Depth First Search",
      },
      {
        name: "Database",
      },
      {
        name: "Binary Search",
      },
      {
        name: "Tree",
      },
      {
        name: "Breadth First Search",
      },
      {
        name: "Matrix",
      },
      {
        name: "Bit Manipulation",
      },
      {
        name: "Two Pointers",
      },
      {
        name: "Binary Tree",
      },
      {
        name: "Heap",
      },
      {
        name: "Prefix Sum",
      },
      {
        name: "Stack",
      },
      {
        name: "Simulation",
      },
      {
        name: "Graph",
      },
      {
        name: "Counting",
      },
      {
        name: "Design",
      },
      {
        name: "Sliding Window",
      },
      {
        name: "Backtracking",
      },
      {
        name: "Enumeration",
      },
      {
        name: "Union Find",
      },
      {
        name: "Linked List",
      },
      {
        name: "Ordered Set",
      },
      {
        name: "Monotonic Stack",
      },
      {
        name: "Number Theory",
      },
      {
        name: "Trie",
      },
      {
        name: "Divide and Conquer",
      },
      {
        name: "Bitmask",
      },
      {
        name: "Recursion",
      },
      {
        name: "Segment Tree",
      },
      {
        name: "Queue",
      },
      {
        name: "Binary Search Tree",
      },
      {
        name: "Memoization",
      },
      {
        name: "Geometry",
      },
      {
        name: "Binary Indexed Tree",
      },
      {
        name: "Hash Function",
      },
      {
        name: "Combinatorics",
      },
      {
        name: "Topological Sort",
      },
      {
        name: "String Matching",
      },
      {
        name: "Shortest Path",
      },
      {
        name: "Rolling Hash",
      },
      {
        name: "Game Theory",
      },
      {
        name: "Interactive",
      },
      {
        name: "Data Stream",
      },
      {
        name: "Brainteaser",
      },
      {
        name: "Monotonic Queue",
      },
      {
        name: "Randomized",
      },
      {
        name: "Merge Sort",
      },
      {
        name: "Iterator",
      },
      {
        name: "Concurrency",
      },
      {
        name: "Doubly Linked List",
      },
      {
        name: "Probability and Statistics",
      },
      {
        name: "Quickselect",
      },
      {
        name: "Bucket Sort",
      },
      {
        name: "Suffix Array",
      },
      {
        name: "Minimum Spanning Tree",
      },
      {
        name: "Counting Sort",
      },
      {
        name: "Shell",
      },
      {
        name: "Line Sweep",
      },
      {
        name: "Reservoir Sampling",
      },
      {
        name: "Strongly Connected Component",
      },
      {
        name: "Eulerian Circuit",
      },
      {
        name: "Radix Sort",
      },
      {
        name: "Rejection Sampling",
      },
      {
        name: "Biconnected Component",
      },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
