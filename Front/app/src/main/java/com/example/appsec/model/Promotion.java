package com.example.appsec.model;

import androidx.annotation.NonNull;

public class Promotion
{
    private int id;
    private String titulo;
    private String description;
    private String image;

    public Promotion(int id, String titulo, String description, String image)
    {
        this.id = id;
        this.titulo = titulo;
        this.description = description;
        this.image = image;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getTitulo()
    {
        return titulo;
    }

    public void setTitulo(String titulo)
    {
        this.titulo = titulo;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }

    @NonNull
    @Override
    public String toString()
    {
        return String.format("ID: %d, Titulo: %s, Description: %s, Image: %s", getId(), getTitulo(), getDescription(), getImage());
    }
}
