package com.example.demo.Hello.model;

import java.io.Serializable;

public class World implements Serializable {

    private String id;
    private String name;

    public World() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "World{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
