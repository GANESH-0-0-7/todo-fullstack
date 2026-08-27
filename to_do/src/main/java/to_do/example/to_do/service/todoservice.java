package to_do.example.to_do.service;

import java.util.List;

import org.springframework.stereotype.Service;

import to_do.example.to_do.entity.todo;
import to_do.example.to_do.repository.Todorepo;

@Service
public class todoservice {

    private final Todorepo todorepo;

    public todoservice(Todorepo todorepo) {
        this.todorepo = todorepo;
    }

    public void addTodo(todo todo) {
        todorepo.save(todo);
    }

    public List<todo> getAllTodos() {
        return todorepo.findAll();
    }

    public todo gettodo(Long id)
    {
        return todorepo.findById(id).orElse(null);
    }

    public todo updateTodo(Long id, todo newTodo) {

    todo existingTodo = todorepo.findById(id).orElse(null);

    if (existingTodo == null) {
        return null;
    }

    existingTodo.setTitle(newTodo.getTitle());
    existingTodo.setCompleted(newTodo.isCompleted());

    return todorepo.save(existingTodo);
}

    public void deleteTodo(Long id) {
        todorepo.deleteById(id);
    }
}