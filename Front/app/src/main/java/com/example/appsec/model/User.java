package com.example.appsec.model;

import androidx.annotation.NonNull;

public class User
{
    private int id;
    private String nombre;
    private String apellido;

    public User(int id, String nombre, String apellido)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public String getApellido()
    {
        return apellido;
    }

    public void setApellido(String apellido)
    {
        this.apellido = apellido;
    }

    @NonNull
    @Override
    public String toString()
    {
        return String.format("ID: %s, Nombre: %s, Apellido: %s", this.id, this.nombre, this.apellido);
    }
}
