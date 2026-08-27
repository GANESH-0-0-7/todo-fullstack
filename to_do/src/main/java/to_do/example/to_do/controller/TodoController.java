package to_do.example.to_do.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import to_do.example.to_do.entity.todo;
import to_do.example.to_do.service.todoservice;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final todoservice todoService;

    public TodoController(todoservice todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello World";
    }

    @PostMapping("/addTodo")
    public void addTodo(@RequestBody todo todo) {
        todoService.addTodo(todo);
    }

    @GetMapping("/getAllTodos")
    public List<todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/getTodo/{id}")
    public todo getTodoById(@PathVariable Long id) {
        return todoService.gettodo(id);
    }

    @PutMapping("/updateTodo/{id}")
    public todo updateTodo(@PathVariable Long id, @RequestBody todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/deleteTodo/{id}")
    public String deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return "Todo with ID " + id + " has been deleted.";
    }
}