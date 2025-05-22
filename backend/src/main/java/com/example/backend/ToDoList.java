package com.example.backend;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;


import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "to_do_list_db")
public class ToDoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Nullable
    private String email;
    private String todo;
    private int priority;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    private String Progress;

    public ToDoList() {
    }

    public ToDoList(String name, @Nullable String email, String todo, int priority, String progress){
        super();
        this.name = name;
        this.email = email;
        this.todo = todo;
        this.priority = priority;
        this.Progress = progress;
        createdAt = new Date();


    }
    public String toString() {
        return "Todo{id=" + id + ", name='" + name + "', email='" + email + "', todo= '" + todo + "', priority=" + priority + " , createdAt'" +createdAt + "'}";
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setEmail(@Nullable String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public Long getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public int getPriority() {
        return priority;
    }

    @Nullable
    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getTodo() {
        return todo;
    }

    public String getProgress() {
        return Progress;
    }
}