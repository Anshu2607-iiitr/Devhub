// Comprehensive Curated Coding Problems from LeetCode, Codeforces CP-31 Sheet, CodeChef, and Verilog HDLBits
// Tiered by difficulty with sample testcases, starter templates, and step-by-step Hinglish Intuition & Dry Runs.

export const CODING_PLATFORMS = [
  { id: "all", name: "All Platforms" },
  { id: "leetcode", name: "LeetCode" },
  { id: "cp31", name: "Codeforces (CP-31 Sheet)" },
  { id: "codechef", name: "CodeChef" },
  { id: "verilog", name: "HDLBits (Verilog)" },
];

export const CODING_DIFFICULTIES = [
  { id: "all", name: "All Difficulties" },
  { id: "easy", name: "Easy / Rating 800-1000" },
  { id: "medium", name: "Medium / Rating 1100-1500" },
  { id: "hard", name: "Hard / Rating 1600-2000+" },
];

export const CODING_CATEGORIES = [
  { id: "all", name: "All Topics" },
  { id: "arrays", name: "Arrays & Hashing" },
  { id: "two-pointers", name: "Two Pointers & Sliding Window" },
  { id: "trees-graphs", name: "Trees, Graphs & BFS/DFS" },
  { id: "dp", name: "Dynamic Programming" },
  { id: "verilog-comb", name: "Verilog Combinational" },
  { id: "verilog-seq", name: "Verilog Sequential & FSM" },
  { id: "verilog-cdc", name: "Verilog Async FIFO & CDC" },
];

export const CODING_CHALLENGES = [
  // ==========================================
  // LEETCODE PROBLEMS
  // ==========================================
  {
    id: "lc-1",
    title: "Two Sum",
    source: "LeetCode",
    sourceId: "leetcode",
    difficulty: "Easy",
    rating: "Easy",
    tags: ["Arrays & Hashing", "Hash Map"],
    category: "arrays",
    xpReward: 50,
    acceptance: "52.4%",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic:
1. Brute force me do nested loops lagte hain: $O(N^2)$ time.
2. Optimal Solution: Ek HashMap create karein \`Map<Integer, Integer> map = new HashMap<>()\`.
3. Array me iterate karte waqt har element \`x\` ke liye check karein ki \`target - x\` pehle se map me maujood hai ya nahi.
4. Agar hai, toh \`[map.get(target - x), current_index]\` return kar dein. Warna current element ko uske index ke sath map me store kar lein.
5. Time Complexity: $O(N)$, Space Complexity: $O(N)$.`,
    starterTemplates: {
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your optimal O(N) HashMap solution here
        return new int[]{};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your optimal O(N) dict solution here
        pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`
    },
    solutionCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
    testCases: [
      { input: "[2, 7, 11, 15], 9", expectedOutput: "[0, 1]", isSample: true },
      { input: "[3, 2, 4], 6", expectedOutput: "[1, 2]", isSample: true },
      { input: "[3, 3], 6", expectedOutput: "[0, 1]", isSample: false }
    ]
  },

  {
    id: "lc-42",
    title: "Trapping Rain Water",
    source: "LeetCode",
    sourceId: "leetcode",
    difficulty: "Hard",
    rating: "Hard",
    tags: ["Two Pointers", "Dynamic Programming", "Stack"],
    category: "two-pointers",
    xpReward: 150,
    acceptance: "61.8%",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic:
1. Kisi bhi position \`i\` par trapped water hota hai: \`min(leftMax, rightMax) - height[i]\`.
2. Optimal Solution: Two Pointers (\`left = 0\`, \`right = n - 1\`) maintain karein with \`leftMax = 0\` and \`rightMax = 0\`.
3. Agar \`height[left] <= height[right]\`, toh water trap left boundary se limit hoga:
   - Agar \`height[left] >= leftMax\`, update \`leftMax = height[left]\`.
   - Warna \`water += leftMax - height[left]\`. Fir \`left++\`.
4. Warna right side se same logic apply karein.
5. Time Complexity: $O(N)$ single pass, Space Complexity: $O(1)$ constant auxiliary memory.`,
    starterTemplates: {
      java: `class Solution {
    public int trap(int[] height) {
        // Write your optimal O(N) time O(1) space two pointers solution
        return 0;
    }
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        # Two pointer implementation
        return 0`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        return 0;
    }
};`
    },
    solutionCode: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isSample: true },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9", isSample: true }
    ]
  },

  {
    id: "lc-146",
    title: "LRU Cache Implementation",
    source: "LeetCode",
    sourceId: "leetcode",
    difficulty: "Medium",
    rating: "Medium",
    tags: ["Hash Map", "Doubly Linked List", "Design"],
    category: "arrays",
    xpReward: 100,
    acceptance: "43.1%",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in $O(1)$ average time complexity.`,
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation: "LRUCache cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1); // returns 1; cache.put(3, 3); // evicts key 2; cache.get(2); // returns -1"
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic:
1. $O(1)$ \`get\` ke liye HashMap chahiye \`Map<Integer, Node>\`.
2. $O(1)$ insertion, removal aur least-recently-used tracking ke liye **Doubly Linked List (DLL)** with dummy \`head\` and \`tail\` nodes banayein.
3. Jab bhi koi key access (\`get\`) ya update (\`put\`) ho, us node ko DLL se detach karke \`head\` ke turant baad (Most Recently Used) insert karein.
4. Capacity exceed hone par \`tail.prev\` (Least Recently Used) node ko DLL aur HashMap dono se delete kar dein.`,
    starterTemplates: {
      java: `class LRUCache {
    // Implement DLL Node and HashMap in O(1)
    public LRUCache(int capacity) {
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
    }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        return -1

    def put(self, key: int, value: int) -> None:
        pass`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) { return -1; }
    void put(int key, int value) {}
};`
    },
    solutionCode: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0);
    private final Node tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertToHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertToHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node node = new Node(key, value);
        insertToHead(node);
        map.put(key, node);
    }
}`,
    testCases: [
      { input: "cap=2, put(1,1), put(2,2), get(1)", expectedOutput: "1", isSample: true },
      { input: "put(3,3), get(2)", expectedOutput: "-1", isSample: true }
    ]
  },

  // ==========================================
  // CODEFORCES CP-31 SHEET PROBLEMS
  // ==========================================
  {
    id: "cf-cp31-800",
    title: "Halloumi Boxes (CP-31 Sheet: Rating 800)",
    source: "Codeforces (CP-31)",
    sourceId: "cp31",
    difficulty: "Easy",
    rating: "800",
    tags: ["Greedy", "Constructive Algorithms", "Sorting"],
    category: "arrays",
    xpReward: 60,
    acceptance: "78.2%",
    description: `You are given an array of $n$ boxes containing integers. You can choose any contiguous subarray of length at most $k$ and reverse it any number of times.

Determine if it is possible to sort the array in non-decreasing order.`,
    constraints: [
      "1 <= t <= 1000 (test cases)",
      "1 <= n <= 100",
      "1 <= k <= n",
      "1 <= a[i] <= 10^9"
    ],
    examples: [
      {
        input: "3\n3 2\n1 2 3\n3 1\n9 9 9\n4 1\n6 4 2 1",
        output: "YES\nYES\nNO",
        explanation: "If k >= 2, we can perform adjacent swaps to generate any permutation (Bubble Sort principle), so array can always be sorted. If k == 1, array can only be sorted if it was already sorted initially."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (CP-31 Rating 800 Pattern):
1. **Case 1 ($k \ge 2$)**: Jab hum length 2 ki subarray ko reverse kar sakte hain, toh iska matlab hum kisi bhi adjacent elements ko swap kar sakte hain (like Bubble Sort). Adjacent swap se koi bhi permutation banayi ja sakti hai, isliye answer **HAMESHA "YES"** hoga.
2. **Case 2 ($k = 1$)**: Length 1 ka reverse karne se array me koi change nahi aayega. Is case me answer tabhi "YES" hoga agar initial array **already sorted** ho.
3. Time Complexity: $O(N)$ check, Space Complexity: $O(1)$.`,
    starterTemplates: {
      java: `import java.util.Scanner;

public class Main {
    public static void solve(Scanner sc) {
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();

        // Write your solution
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // Write your solution
}

int main() {
    int t; cin >> t;
    while (t--) solve();
    return 0;
}`,
      python: `import sys

def solve():
    # Read n, k, and list a
    pass`
    },
    solutionCode: `import java.util.Scanner;

public class Main {
    public static boolean isSorted(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int k = sc.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = sc.nextInt();

            if (k > 1 || isSorted(a)) {
                System.out.println("YES");
            } else {
                System.out.println("NO");
            }
        }
    }
}`,
    testCases: [
      { input: "n=3, k=2, a=[1, 2, 3]", expectedOutput: "YES", isSample: true },
      { input: "n=4, k=1, a=[6, 4, 2, 1]", expectedOutput: "NO", isSample: true }
    ]
  },

  {
    id: "cf-cp31-1000",
    title: "Swap and Delete (CP-31 Sheet: Rating 1000)",
    source: "Codeforces (CP-31)",
    sourceId: "cp31",
    difficulty: "Medium",
    rating: "1000",
    tags: ["Strings", "Greedy", "Constructive"],
    category: "arrays",
    xpReward: 90,
    acceptance: "64.5%",
    description: `You are given a binary string $s$. You can create string $t$ by rearranging some characters of $s$ and deleting the rest.

Cost of the operation is the number of deleted characters. We want $t$ to be good, meaning $t[i] \neq s[i]$ for all $1 \le i \le |t|$.

Find the minimum cost (minimum deletions) to form a good string $t$.`,
    constraints: [
      "1 <= t <= 10^4",
      "1 <= |s| <= 2 * 10^5",
      "Sum of |s| over all test cases <= 2 * 10^5"
    ],
    examples: [
      {
        input: "4\n0\n011\n01011100\n1111",
        output: "1\n1\n0\n4",
        explanation: "For '011', count 0s = 1, 1s = 2. Prefix can match 1 opposite 0, and 0 opposite 1, deleting 1 character."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (CP-31 Rating 1000 Greedy Count):
1. Pehle poore string $s$ me total \`count0\` aur \`count1\` calculate karein.
2. Ab index $i=0$ se shuru karke string $s$ ko scan karein:
   - Agar $s[i] == '0'$, toh position $i$ par match karne ke liye hume ek **'1'** ki zaroorat hai. Agar \`count1 > 0\`, \`count1--\` kar dein.
   - Agar $s[i] == '1'$, toh match karne ke liye ek **'0'** ki zaroorat hai. Agar \`count0 > 0\`, \`count0--\` kar dein.
   - Agar required opposite character khatam ho chuka hai, iska matlab yahi par string $t$ terminate karni padegi!
3. Minimum cost = remaining remaining characters = $(|s| - i)$.`,
    starterTemplates: {
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next();
            // Implement greedy frequency depletion
        }
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void solve() {
    string s; cin >> s;
    // Greedy opposite matching
}

int main() {
    int t; cin >> t;
    while (t--) solve();
    return 0;
}`,
      python: `import sys

def solve(s: str) -> int:
    # Greedy opposite count match
    return 0`
    },
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next();
            int c0 = 0, c1 = 0;
            for (char c : s.toCharArray()) {
                if (c == '0') c0++;
                else c1++;
            }

            int matched = 0;
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '0') {
                    if (c1 > 0) { c1--; matched++; }
                    else break;
                } else {
                    if (c0 > 0) { c0--; matched++; }
                    else break;
                }
            }
            System.out.println(s.length() - matched);
        }
    }
}`,
    testCases: [
      { input: "s = '011'", expectedOutput: "1", isSample: true },
      { input: "s = '1111'", expectedOutput: "4", isSample: true },
      { input: "s = '01011100'", expectedOutput: "0", isSample: false }
    ]
  },

  // ==========================================
  // CODECHEF CHALLENGES
  // ==========================================
  {
    id: "cc-chef-dolls",
    title: "Chef and Dolls (Starters / Easy)",
    source: "CodeChef",
    sourceId: "codechef",
    difficulty: "Easy",
    rating: "1100",
    tags: ["Bit Manipulation", "XOR", "Arrays"],
    category: "arrays",
    xpReward: 50,
    acceptance: "75.8%",
    description: `Chef is a doll collector. He has $N$ dolls where each doll has a type $T_i$. All dolls appear in pairs (even count), except for exactly one unique doll whose pair was stolen.

Find the type of the stolen doll.`,
    constraints: [
      "1 <= T <= 10",
      "1 <= N <= 10^5 (N is always odd)",
      "1 <= type[i] <= 10^5"
    ],
    examples: [
      {
        input: "3\n1\n1\n3\n1\n2\n1\n5\n1\n1\n2\n2\n3",
        output: "1\n2\n3",
        explanation: "In [1, 2, 1], doll 1 has a pair, while doll 2 has no pair."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (XOR Parity Property):
1. Property of XOR: $A \oplus A = 0$ and $A \oplus 0 = A$.
2. Saare array elements ka XOR calculate karein: \`ans = ans ^ type[i]\`.
3. Saare duplicate pairs ek dusre ko cancel out ($0$) kar denge, aur end me sirf single odd-occurring element bachega!
4. Time Complexity: $O(N)$, Space Complexity: $O(1)$ (No HashMap needed).`,
    starterTemplates: {
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int ans = 0;
            // XOR all elements
            System.out.println(ans);
        }
    }
}`,
      python: `import sys

def solve(arr: list[int]) -> int:
    ans = 0
    for x in arr:
        ans ^= x
    return ans`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int x; cin >> x;
            ans ^= x;
        }
        cout << ans << "\\n";
    }
    return 0;
}`
    },
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int ans = 0;
            for (int i = 0; i < n; i++) {
                ans ^= sc.nextInt();
            }
            System.out.println(ans);
        }
    }
}`,
    testCases: [
      { input: "N=3, dolls=[1, 2, 1]", expectedOutput: "2", isSample: true },
      { input: "N=5, dolls=[1, 1, 2, 2, 3]", expectedOutput: "3", isSample: true }
    ]
  },

  // ==========================================
  // VERILOG HDLBITS HARDWARE PROBLEMS
  // ==========================================
  {
    id: "v-hdl-1",
    title: "4-Bit Binary Counter with Synchronous Load & Enable",
    source: "HDLBits (Verilog)",
    sourceId: "verilog",
    difficulty: "Easy",
    rating: "Verilog Easy",
    tags: ["Sequential Logic", "Flip-Flops", "Counters"],
    category: "verilog-seq",
    xpReward: 80,
    acceptance: "84.2%",
    description: `Design a 4-bit binary up-counter with synchronous active-high reset, synchronous load, and enable controls.

### Pin Specifications:
- \`clk\`: Clock input (positive edge triggered)
- \`rst\`: Synchronous active-high reset (clears count to 0)
- \`load\`: Synchronous load (loads \`d\` into counter)
- \`ena\`: Count enable (increments counter by 1)
- \`d [3:0]\`: 4-bit input data to load
- \`q [3:0]\`: 4-bit output count`,
    constraints: [
      "Synchronous priority order: reset > load > enable.",
      "Counter wraps from 4'b1111 (15) to 4'b0000 (0)."
    ],
    examples: [
      {
        input: "clk=rising, rst=1 -> q <= 4'b0000",
        output: "q = 4'h0",
        explanation: "Synchronous reset overrides load and enable."
      },
      {
        input: "clk=rising, rst=0, load=1, d=4'hA -> q <= 4'b1010",
        output: "q = 4'hA",
        explanation: "Loads parallel data d into register."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (Sequential Priority MUX Pattern):
1. Ye clocked sequential circuit hai, isliye \`always @(posedge clk)\` use karein.
2. Reset **synchronous** hai, isliye sensitivity list me sirf \`@(posedge clk)\` aayega (\`or posedge rst\` NAHI aayega).
3. Priority hierarchy follow karein:
   - \`if (rst) q <= 4'b0000;\`
   - \`else if (load) q <= d;\`
   - \`else if (ena) q <= q + 1'b1;\`
4. Non-blocking assignment \`<=\` use karein.`,
    starterTemplates: {
      verilog: `module top_module (
    input  wire       clk,
    input  wire       rst,
    input  wire       load,
    input  wire       ena,
    input  wire [3:0] d,
    output reg  [3:0] q
);
    // Write your synthesizable counter always block here

endmodule`
    },
    solutionCode: `module top_module (
    input  wire       clk,
    input  wire       rst,
    input  wire       load,
    input  wire       ena,
    input  wire [3:0] d,
    output reg  [3:0] q
);
    always @(posedge clk) begin
        if (rst)
            q <= 4'b0000;
        else if (load)
            q <= d;
        else if (ena)
            q <= q + 1'b1;
    end
endmodule`,
    testCases: [
      { input: "rst=1", expectedOutput: "q = 4'h0", isSample: true },
      { input: "rst=0, load=1, d=4'h7", expectedOutput: "q = 4'h7", isSample: true },
      { input: "rst=0, load=0, ena=1 (from 7)", expectedOutput: "q = 4'h8", isSample: false }
    ]
  },

  {
    id: "v-hdl-2",
    title: "1011 Pattern Detector (Moore FSM)",
    source: "HDLBits (Verilog)",
    sourceId: "verilog",
    difficulty: "Medium",
    rating: "Verilog Medium",
    tags: ["FSM", "Moore Machine", "Sequence Detection"],
    category: "verilog-seq",
    xpReward: 120,
    acceptance: "59.4%",
    description: `Design a Moore Finite State Machine (FSM) that detects the sequence \`1011\` on a serial bitstream \`in\`. Overlapping sequences are allowed.

Output \`out\` must be \`1\` when the sequence \`1011\` has been detected.`,
    constraints: [
      "Active-high synchronous reset clears state to S_RESET (000).",
      "Overlapping sequences (e.g. 1011011 gives 2 detections) must be supported."
    ],
    examples: [
      {
        input: "in: 0 1 0 1 1 0 1 1",
        output: "out: 0 0 0 0 1 0 0 1",
        explanation: "First 1011 detected at tick 5, second overlapping 1011 detected at tick 8."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (3-Always-Block Moore FSM):
1. **States define karein**:
   - \`S_IDLE\` (000): No matching prefix
   - \`S_1\` (001): Matched '1'
   - \`S_10\` (010): Matched '10'
   - \`S_101\` (011): Matched '101'
   - \`S_1011\` (100): Matched '1011' -> \`out = 1\`
2. **State transitions for Overlap**:
   - In \`S_1011\`, agar agla input \`1\` aaye toh state \`S_1\` me jayein; agar \`0\` aaye toh state \`S_10\` me jayein (kyunki sequence '10' already match ho chuki hai)!
3. **Moore Output**: \`assign out = (state == S_1011);\``,
    starterTemplates: {
      verilog: `module top_module (
    input  wire clk,
    input  wire areset, // Asynchronous active-high reset
    input  wire in,
    output wire out
);
    // Define state parameters and next-state logic

endmodule`
    },
    solutionCode: `module top_module (
    input  wire clk,
    input  wire areset,
    input  wire in,
    output wire out
);
    localparam [2:0] S_IDLE = 3'b000,
                     S_1    = 3'b001,
                     S_10   = 3'b010,
                     S_101  = 3'b011,
                     S_1011 = 3'b100;

    reg [2:0] state, next_state;

    // State register
    always @(posedge clk or posedge areset) begin
        if (areset)
            state <= S_IDLE;
        else
            state <= next_state;
    end

    // Next state combinational logic
    always @(*) begin
        case (state)
            S_IDLE: next_state = in ? S_1   : S_IDLE;
            S_1:    next_state = in ? S_1   : S_10;
            S_10:   next_state = in ? S_101 : S_IDLE;
            S_101:  next_state = in ? S_1011 : S_10;
            S_1011: next_state = in ? S_1   : S_10; // Overlap handling
            default: next_state = S_IDLE;
        endcase
    end

    // Moore output (pure state decode)
    assign out = (state == S_1011);
endmodule`,
    testCases: [
      { input: "Sequence: 1, 0, 1, 1", expectedOutput: "out = 1", isSample: true },
      { input: "Sequence: 1, 0, 1, 0", expectedOutput: "out = 0", isSample: false }
    ]
  },

  {
    id: "v-hdl-3",
    title: "Dual-Clock Asynchronous FIFO Gray Synchronizer",
    source: "HDLBits (Verilog)",
    sourceId: "verilog",
    difficulty: "Hard",
    rating: "Verilog Hard",
    tags: ["CDC", "Asynchronous FIFO", "Metastability", "Gray Code"],
    category: "verilog-cdc",
    xpReward: 160,
    acceptance: "41.2%",
    description: `Design a parameterized 2-stage Flip-Flop Synchronizer for Clock Domain Crossing (CDC) that safely passes Gray-coded multi-bit read/write pointers between asynchronous clock domains without metastability hazards.`,
    constraints: [
      "Supports arbitrary bus width parameter (default WIDTH = 4).",
      "Apply (* ASYNC_REG = \"TRUE\" *) synthesis attributes to both register stages."
    ],
    examples: [
      {
        input: "dest_clk, dest_rst_n=0 -> sync_gray_out <= 0",
        output: "sync_gray_out = 4'h0",
        explanation: "Asynchronous active-low reset clears both pipeline synchronizer stages."
      }
    ],
    hinglishIntuition: `💡 Hinglish Logic (Metastability MTBF Double-Flop Synchronizer):
1. Jab async signal destination clock domain me sample hota hai, toh setup/hold violation se Flip-Flop metastable voltage par atak sakta hai.
2. Solution: Do cascaded flip-flops lagayein (\`stage1\` and \`stage2\`).
3. First flop metastability absorb karega, aur next clock tick tak stable logic level resolve ho jayega.
4. Xilinx/Intel FPGA ke liye \`(* ASYNC_REG = "TRUE" *)\` attribute lagana compulsory hai taaki placer dono flip-flops ko adjacent silicon slices me place kare.`,
    starterTemplates: {
      verilog: `module cdc_synchronizer #(
    parameter WIDTH = 4
)(
    input  wire             dest_clk,
    input  wire             dest_rst_n,
    input  wire [WIDTH-1:0] async_gray_in,
    output reg  [WIDTH-1:0] sync_gray_out
);
    // Write 2-flop MTBF synchronizer

endmodule`
    },
    solutionCode: `module cdc_synchronizer #(
    parameter WIDTH = 4
)(
    input  wire             dest_clk,
    input  wire             dest_rst_n,
    input  wire [WIDTH-1:0] async_gray_in,
    output reg  [WIDTH-1:0] sync_gray_out
);
    (* ASYNC_REG = "TRUE" *) reg [WIDTH-1:0] stage1_reg;

    always @(posedge dest_clk or negedge dest_rst_n) begin
        if (!dest_rst_n) begin
            stage1_reg    <= {WIDTH{1'b0}};
            sync_gray_out <= {WIDTH{1'b0}};
        end else begin
            stage1_reg    <= async_gray_in;
            sync_gray_out <= stage1_reg;
        end
    end
endmodule`,
    testCases: [
      { input: "dest_rst_n=0", expectedOutput: "sync_gray_out = 0", isSample: true },
      { input: "async_gray_in=4'b1100, 2 clk cycles", expectedOutput: "sync_gray_out = 4'b1100", isSample: true }
    ]
  }
];
