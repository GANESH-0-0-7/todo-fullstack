package to_do.example.to_do.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to_do.example.to_do.entity.todo;

public interface Todorepo extends JpaRepository<todo, Long> {

}