export const CPP_JUDGE0_ID = "54";
export const JAVASCRIPT_JUDGE0_ID = "93";
export const PYTHON_JUDGE0_ID = "92";
export const DEFAULT_CPP_INCLUDES = `#include <algorithm>
#include <array>
#include <bitset>
#include <deque>
#include <iostream>
#include <iterator>
#include <list>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
#include <cmath>
using namespace std;
`;

export const DEFAULT_CPP_STRUCT_CLASS = `struct ListNode {
  int val;
  ListNode *next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode *next) : val(x), next(next) {}
};
`

export const DEFAULT_PYTHON_IMPORTS = `from typing import (
    List, Tuple, Set, Dict, FrozenSet, Deque, Optional, Union,
    Any, Callable, TypeVar, Generic, Literal, Final, Protocol, TypedDict, Annotated
)

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
`
