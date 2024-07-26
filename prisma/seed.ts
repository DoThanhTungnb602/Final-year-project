import { db } from "~/server/db";

async function main() {
  // Delete all data in the database
  await db.$executeRaw`TRUNCATE "User" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Problem" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Class" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Language" CASCADE;`;
  await db.$executeRaw`TRUNCATE "Topic" CASCADE;`;

  await db.language.createMany({
    data: [
      {
        id: "54",
        name: "C++",
        editorValue: "cpp",
      },
      // {
      //   id: 51,
      //   name: "C#",
      //   editorValue: "csharp",
      // },
      // {
      //   id: "91",
      //   name: "Java",
      //   editorValue: "java",
      // },
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
      // {
      //   id: "94",
      //   name: "TypeScript",
      //   editorValue: "typescript",
      // },
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

  // Fake data
  await db.problem.create({
    data: {
      title: "Sort Colors",
      difficulty: "MEDIUM",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Length of Last Word",
      difficulty: "EASY",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Search Insert Position",
      difficulty: "EASY",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Combination Sum",
      difficulty: "MEDIUM",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Longest Valid Parentheses",
      difficulty: "HARD",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Valid Parentheses",
      difficulty: "EASY",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Integer to Roman",
      difficulty: "MEDIUM",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "MEDIUM",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Median of Two Sorted Arrays",
      difficulty: "HARD",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Add Two Numbers",
      difficulty: "EASY",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Two Sum",
      difficulty: "EASY",
      isPublic: true,
      description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: nums = [3,3], target = 6
Output: [0,1]</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p><code>2 &lt;= nums.length &lt;= 104</code></p></li><li><p><code>-109 &lt;= nums[i] &lt;= 109</code></p></li><li><p><code>-109 &lt;= target &lt;= 109</code></p></li><li><p><strong>Only one valid answer exists.</strong></p></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n2)</code>&nbsp;time complexity?</p> problem-form.tsx:336:38
`,
      solution: `<h3>Approach 1: Brute Force</h3><p><strong>Algorithm</strong></p><p>The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        for (int i = 0; i &lt; nums.size(); i++) {
            for (int j = i + 1; j &lt; nums.size(); j++) {
                if (nums[j] == target - nums[i]) {
                    return {i, j};
                }
            }
        }
        // Return an empty vector if no solution is found
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n2).<br>For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n2).</p></li><li><p>Space complexity: O(1).<br>The space required does not depend on the size of the input array, so only constant space is used.</p></li></ul><hr><h3></h3><h3>Approach 2: Two-pass Hash Table</h3><p><strong>Intuition</strong></p><p>To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.</p><p>We can reduce the lookup time from O(n) to O(1) by trading space for speed. A hash table is well suited for this purpose because it supports fast lookup in <em>near</em> constant time. I say "near" because if a collision occurred, a lookup could degenerate to O(n) time. However, lookup in a hash table should be amortized O(1) time as long as the hash function was chosen carefully.</p><p><strong>Algorithm</strong></p><p>A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); i++) {
            hash[nums[i]] = i;
        }
        for (int i = 0; i &lt; nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end() &amp;&amp; hash[complement] != i) {
                return {i, hash[complement]};
            }
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.</p></li></ul><hr><h3></h3><h3>Approach 3: One-pass Hash Table</h3><p><strong>Algorithm</strong></p><p>It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.</p><p><strong>Implementation</strong></p><pre><code>class Solution {
public:
    vector&lt;int&gt; twoSum(vector&lt;int&gt; &amp;nums, int target) {
        unordered_map&lt;int, int&gt; hash;
        for (int i = 0; i &lt; nums.size(); ++i) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};</code></pre><p><strong>Complexity Analysis</strong></p><ul><li><p>Time complexity: O(n).<br>We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</p></li><li><p>Space complexity: O(n).<br>The extra space required depends on the number of items stored in the hash table, which stores at most n elements.</p></li></ul>`,
      testcases: `[
  {
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    },
    "expected_output": [0, 1]
  },
  {
    "input": {
      "nums": [3, 2, 4],
      "target": 6
    },
    "expected_output": [1, 2]
  },
  {
    "input": {
      "nums": [3, 3],
      "target": 6
    },
    "expected_output": [0, 1]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int target = 0, num = 0;
  std::vector<int> output;
  bool flag = true;

  while (std::cin >> num) {
    if (flag) {
      nums.push_back(num);
    } else {
      target = num;
    }
    if (std::cin.get() == '\n') {
      flag = false;
    }
  }

  output = solution.twoSum(nums, target);

  for (int i = 0; i < output.size(); i++) {
    if (i == output.size() - 1) {
      std::cout << output[i];
    } else {
      std::cout << output[i] << " ";
    }
  }

  return 0;
}
`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    target = int(input())
    result = Solution().twoSum(nums, target)
    for i in range(len(result)):
        if i == len(result) - 1:
            print(result[i], end='')
        else:
            print(result[i], end=' ')

if __name__ == '__main__':
    main()
`,
            },
            {
              languageId: "93",
              code: String.raw`const nums = [];
let target = 0;
let flag = true;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    if (flag) {
      nums.push(num);
    } else {
      target = num;
    }
  }
  flag = false;
});

rl.once("close", () => {
  const output = twoSum(nums, target);
  console.log(output.join(" "));
});
`,
            },
          ],
        },
      },
      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            },
          ],
        },
      },
    },
  });

  await db.problem.create({
    data: {
      title: "Reverse Linked List",
      difficulty: "MEDIUM",
      isPublic: true,
      description: `<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><code>Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]</code></pre><p><strong>Example 2:</strong></p><pre><code>Input: head = [1,2]
Output: [2,1]</code></pre><p><strong>Example 3:</strong></p><pre><code>Input: head = []
Output: []</code></pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><p>The number of nodes in the list is the range <code>[0, 5000]</code>.</p></li><li><p><code>-5000 &lt;= Node.val &lt;= 5000</code></p></li></ul><p>&nbsp;</p><p><strong>Follow up:</strong> A linked list can be reversed either iteratively or recursively. Could you implement both? </p>`,
      tags: {
        connect: [
          {
            name: "Linked List",
          },
        ],
      },
      solution: `<p>Well, since the <code>head</code> pointer may also be modified, we create a <code>pre</code> that points to it to facilitate the reverse process.</p><p>For the example list <code>1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5</code> in the problem statement, it will become <code>0 -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5</code> (we init <code>pre -&gt; val</code> to be <code>0</code>). We also set a pointer <code>cur</code> to <code>head</code>. Then we keep inserting <code>cur -&gt; next</code> after <code>pre</code> until <code>cur</code> becomes the last node. This idea uses three pointers (<code>pre</code>, <code>cur</code> and <code>temp</code>). You may implement it as follows.</p><pre><code class="language-cpp">class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *pre = new ListNode(0), *cur = head;
        pre -&gt; next = head;
        while (cur &amp;&amp; cur -&gt; next) {
            ListNode* temp = pre -&gt; next;
            pre -&gt; next = cur -&gt; next;
            cur -&gt; next = cur -&gt; next -&gt; next;
            pre -&gt; next -&gt; next = temp;
        }
        return pre -&gt; next;
    }
};</code></pre><p>Or</p><pre><code class="language-cpp">class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *pre = new ListNode(0), *cur = head;
        pre -&gt; next = head;
        while (cur &amp;&amp; cur -&gt; next) {
            ListNode* temp = cur -&gt; next;
            cur -&gt; next = temp -&gt; next;
            temp -&gt; next = pre -&gt; next;
            pre -&gt; next = temp;
        }
        return pre -&gt; next;
    }
};</code></pre><p>We can even use fewer pointers. The idea is to reverse one node at a time from the beginning of the list.</p><pre><code class="language-cpp">class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* cur = NULL;
        while (head) {
            ListNode* next = head -&gt; next;
            head -&gt; next = cur;
            cur = head;
            head = next;
        }
        return cur;
    }
};</code></pre><p>All the above solutions are iterative. A recursive one is as follows. First reverse all the nodes after <code>head</code>. Then we need to set <code>head</code> to be the final node in the reversed list. We simply set its next node in the original list (<code>head -&gt; next</code>) to point to it and sets its <code>next</code> to <code>NULL</code>.</p><pre><code class="language-cpp">class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !(head -&gt; next)) {
            return head;
        }
        ListNode* node = reverseList(head -&gt; next);
        head -&gt; next -&gt; next = head;
        head -&gt; next = NULL;
        return node;
    }
}; </code></pre>`,
      testcases: `[
  {
    "input": {
      "head": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "expected_output": [
      5,
      4,
      3,
      2,
      1
    ]
  },
  {
    "input": {
      "head": [
        2,
        1
      ]
    },
    "expected_output": [
      1,
      2
    ]
  },
  {
    "input": {
      "head": []
    },
    "expected_output": []
  },
  {
    "input": {
      "head": [
        -4729
      ]
    },
    "expected_output": [
      -4729
    ]
  },
  {
    "input": {
      "head": [
        -1597,
        -1603
      ]
    },
    "expected_output": [
      -1603,
      -1597
    ]
  },
  {
    "input": {
      "head": [
        1655,
        1659,
        1663
      ]
    },
    "expected_output": [
      1663,
      1659,
      1655
    ]
  },
  {
    "input": {
      "head": [
        4541,
        4546,
        4551,
        4556
      ]
    },
    "expected_output": [
      4556,
      4551,
      4546,
      4541
    ]
  },
  {
    "input": {
      "head": [
        -4588,
        -4585,
        -4582,
        -4579,
        -4576
      ]
    },
    "expected_output": [
      -4576,
      -4579,
      -4582,
      -4585,
      -4588
    ]
  },
  {
    "input": {
      "head": [
        -557,
        -554,
        -551,
        -548,
        -545,
        -542
      ]
    },
    "expected_output": [
      -542,
      -545,
      -548,
      -551,
      -554,
      -557
    ]
  },
  {
    "input": {
      "head": [
        4352,
        4362,
        4372,
        4382,
        4392,
        4402,
        4412,
        4422,
        4432,
        4442,
        4452,
        4462,
        4472,
        4482,
        4492,
        4502,
        4512,
        4522,
        4532,
        4542,
        4552,
        4562,
        4572,
        4582,
        4592,
        4602,
        4612,
        4622,
        4632,
        4642,
        4652,
        4662,
        4672,
        4682,
        4692,
        4702,
        4712,
        4722,
        4732,
        4742,
        4752,
        4762,
        4772,
        4782,
        4792,
        4802,
        4812,
        4822,
        4832,
        4842,
        4852,
        4862,
        4872,
        4882,
        4892,
        4902,
        4912,
        4922,
        4932,
        4942,
        4952,
        4962,
        4972,
        4982,
        4992,
        -4998,
        -4988,
        -4978,
        -4968,
        -4958,
        -4948,
        -4938,
        -4928,
        -4918,
        -4908,
        -4898,
        -4888,
        -4878,
        -4868,
        -4858,
        -4848,
        -4838,
        -4828,
        -4818,
        -4808,
        -4798,
        -4788,
        -4778,
        -4768,
        -4758,
        -4748,
        -4738,
        -4728,
        -4718,
        -4708,
        -4698,
        -4688,
        -4678,
        -4668,
        -4658
      ]
    },
    "expected_output": [
      -4658,
      -4668,
      -4678,
      -4688,
      -4698,
      -4708,
      -4718,
      -4728,
      -4738,
      -4748,
      -4758,
      -4768,
      -4778,
      -4788,
      -4798,
      -4808,
      -4818,
      -4828,
      -4838,
      -4848,
      -4858,
      -4868,
      -4878,
      -4888,
      -4898,
      -4908,
      -4918,
      -4928,
      -4938,
      -4948,
      -4958,
      -4968,
      -4978,
      -4988,
      -4998,
      4992,
      4982,
      4972,
      4962,
      4952,
      4942,
      4932,
      4922,
      4912,
      4902,
      4892,
      4882,
      4872,
      4862,
      4852,
      4842,
      4832,
      4822,
      4812,
      4802,
      4792,
      4782,
      4772,
      4762,
      4752,
      4742,
      4732,
      4722,
      4712,
      4702,
      4692,
      4682,
      4672,
      4662,
      4652,
      4642,
      4632,
      4622,
      4612,
      4602,
      4592,
      4582,
      4572,
      4562,
      4552,
      4542,
      4532,
      4522,
      4512,
      4502,
      4492,
      4482,
      4472,
      4462,
      4452,
      4442,
      4432,
      4422,
      4412,
      4402,
      4392,
      4382,
      4372,
      4362,
      4352
    ]
  }
]`,
      testCaseDrivers: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`int main() {
  Solution solution;

  std::vector<int> nums;
  int num = 0;

  while (std::cin >> num) {
    nums.push_back(num);
  }

  if (nums.size() == 0) {
    cout<<""<<endl;
    return 0;
  }

  ListNode *head = new ListNode(nums[0]);
  ListNode *current = head;
  for (int i = 1; i < nums.size(); i++) {
    current->next = new ListNode(nums[i]);
    current = current->next;
  }

  ListNode *newHead = solution.reverseList(head);

  while (newHead != nullptr) {
    if (newHead->next == nullptr) {
      std::cout << newHead->val;
    } else {
      std::cout << newHead->val << " ";
    }
    newHead = newHead->next;
  }

  return 0;
}`,
            },
            {
              languageId: "92",
              code: String.raw`def main():
    nums = list(map(int, input().split()))
    if not nums:
        return
    head = ListNode(nums[0])
    current = head
    for num in nums[1:]:
        current.next = ListNode(num)
        current = current.next
    result = Solution().reverseList(head)
    while result:
        if result.next:
            print(result.val, end=' ')
        else:
            print(result.val, end='')
        result = result.next

if __name__ == '__main__':
    main()`,
            },
            {
              languageId: "93",
              code: String.raw`function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const nums = [];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const values = line.split(/\s+/).map(Number);
  for (let num of values) {
    nums.push(num);
  }
});

rl.once("close", () => {
  if (nums.length == 0) {
    return;
  }
  let head = new ListNode(nums[0]);
  let temp = head;
  for (let i = 1; i < nums.length; i++) {
    temp.next = new ListNode(nums[i]);
    temp = temp.next;
  }
  let output = reverseList(head);
  let result = [];
  while (output != null) {
    result.push(output.val);
    output = output.next;
  }
  console.log(result.join(" "));
});`,
            },
          ],
        },
      },

      skeletons: {
        createMany: {
          data: [
            {
              languageId: "54",
              code: String.raw`/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: String.raw`# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        `,
            },
            {
              languageId: "93",
              code: String.raw`/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};`,
            },
          ],
        },
      },
    },
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
