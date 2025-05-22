package com.example.backend;


import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
@CrossOrigin(origins = "https://frontend-dot-cogent-node-459907-q6.uc.r.appspot.com")
@RestController
@RequestMapping("/todolists")


public class ToDoListController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-db")
    public String testConnection() {
        try (Connection conn = dataSource.getConnection()) {
            return "Successfully connected to: " + conn.getMetaData().getURL();
        } catch (SQLException e) {
            return "Connection failed: " + e.getMessage();
        }
    }

    @Autowired
    private ToDoListService toDoListService;

    public ToDoListController(ToDoListService toDoListService){
        this.toDoListService = toDoListService;
    }

    @PostMapping("/create")
    public String createTodo(@RequestParam String name, @RequestParam @Nullable String email, @RequestParam String todo, @RequestParam int priority, @RequestParam String progress){
        toDoListService.createToDo(name,email,todo,priority,progress);
        return "Todo Object created successfully";
    }
    @PostMapping("/lazycreate")
    public String createTodo(@RequestParam String name){
        toDoListService.createToDo(name,"email","todo",5, "Completed");
        return "Todo Object created successfully";
    }
    @DeleteMapping ("/delete")
    public String deleteTodo(@RequestParam long id){
        toDoListService.deleteToDo(id);
        return "Todo " + id +" deleted successfully";
    }
    @PatchMapping("/updateName")
    public String updateName(@RequestParam long id, @RequestParam String newName){
        toDoListService.updateName(id,newName);
        return "Todo " + id +" updated successfully";
    }
    @PatchMapping("/updateTodo")
    public String updateToDo(@RequestParam long id, @RequestParam String newToDo){
        toDoListService.updateTodo(id, newToDo);
        return "Todo " + id +" updated successfully";
    }

    @PatchMapping("/updateEmail")
    public String updateEmail(@RequestParam long id, @RequestParam String newEmail){
        toDoListService.updateEmail(id, newEmail);
        return "Todo " + id +" updated successfully";
    }

    @PatchMapping("/updateProgress")
    public String updateProgress(@RequestParam long id, @RequestParam String newProgress){
        toDoListService.updateProgress(id, newProgress);
        return "Todo " + id +" updated successfully";
    }

    @GetMapping("/getAll")
        public List<ToDoList> getAllTodo(){
            return toDoListService.getAllTodo();

    }

    @GetMapping("/test")
    public String test() {
        return "It works!";
    }

}
