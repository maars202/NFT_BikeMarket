pragma solidity ^0.8.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

      constructor() public {
        createTask("https://images.unsplash.com/photo-1638984849670-7f41daa1ba6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80");
        createTask("https://images.unsplash.com/photo-1636388951474-d84e2e5bb6a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8T3h5bnRKb0JERll8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60");
        createTask("https://images.unsplash.com/photo-1619118417431-a456896b2e21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8aVVJc25WdGpCMFl8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60");
      }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }

}