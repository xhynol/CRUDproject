package com.example.backend;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoListService {
    private final ToDoListRepository toDoListRepository;

    public ToDoListService(ToDoListRepository toDoListRepository){
        this.toDoListRepository = toDoListRepository;
    }

    public void createToDo(String name, @Nullable String email, String todo, int priority, String progress){
        ToDoList toDoList = new ToDoList( name, email, todo, priority, progress);
        toDoListRepository.save(toDoList);
    }


    public void deleteToDo(long id){
        if(toDoListRepository.existsById(id)) {
            toDoListRepository.deleteById(id);
        } else {
            throw new RuntimeException("Todo with id " + id + " not found");
        }
    }

    public List<ToDoList> getAllTodo(){
        return toDoListRepository.findAll();
    }

    public List<String> getEmails(String name){
        return toDoListRepository.GetAllEmailsOfName(name);
    }


    public void updateName(Long id, String name){
        if(toDoListRepository.existsById(id)) {
            toDoListRepository.updateName(id,name);
        } else {
            throw new RuntimeException("Todo with id " + id + " not found");
        }

    }


    public void updateTodo(Long id, String todo){
        if(toDoListRepository.existsById(id)) {
            toDoListRepository.updateTodo(id,todo);
        } else {
            throw new RuntimeException("Todo with id " + id + " not found");
        }
    }


    public void updateEmail(Long id, String email){
        if(toDoListRepository.existsById(id)) {
            toDoListRepository.updateEmail(id,email);
        } else {
            throw new RuntimeException("Todo with id " + id + " not found");
        }
    }

    public void updateProgress(Long id, String progess){
        if(toDoListRepository.existsById(id)) {
            toDoListRepository.updateProgress(id,progess);
        } else {
            throw new RuntimeException("Todo with id " + id + " not found");
        }
    }

}
