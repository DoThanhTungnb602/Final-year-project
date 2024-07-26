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
              code: `int main() {
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
              code: `def main():
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
              code: `const nums = [];
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
              code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            },
            {
              languageId: "92",
              code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        `,
            },
            {
              languageId: "93",
              code: `/**
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
