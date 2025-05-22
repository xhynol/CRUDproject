package com.example.backend;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.ToDoList;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long>{
    @Query(value = "SELECT email FROM to_do_list_db Where name + :name", nativeQuery = true)
    List<String> GetAllEmailsOfName(@Param("name") String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE to_do_list_db SET name = :newName WHERE id = :id", nativeQuery = true)
    void updateName(@Param("id") long id, @Param("newName") String newName);

    @Transactional
    @Modifying
    @Query(value = "UPDATE to_do_list_db SET todo = :newTodo WHERE id = :id", nativeQuery = true)
    void updateTodo(@Param("id") long id, @Param("newTodo") String newName);

    @Transactional
    @Modifying
    @Query(value = "UPDATE to_do_list_db SET email = :newEmail WHERE id = :id", nativeQuery = true)
    void updateEmail(@Param("id") long id, @Param("newEmail") String newName);

    @Transactional
    @Modifying
    @Query(value = "UPDATE to_do_list_db SET progress = :newProgress WHERE id = :id", nativeQuery = true)
    void updateProgress(@Param("id") long id, @Param("newProgress") String newName);


}
