package com.example.appsec.model;

import androidx.annotation.NonNull;

public class Account
{
    private int id;
    private String numero;
    private String tarjeta;
    private String clabe;
    private double saldo;
    private int userID;

    public Account(int id, String numero, String tarjeta, String clabe, double saldo, int userID)
    {
        this.id = id;
        this.numero = numero;
        this.tarjeta = tarjeta;
        this.clabe = clabe;
        this.saldo = saldo;
        this.userID = userID;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getNumero()
    {
        return numero;
    }

    public void setNumero(String numero)
    {
        this.numero = numero;
    }

    public String getTarjeta()
    {
        return tarjeta;
    }

    public void setTarjeta(String tarjeta)
    {
        this.tarjeta = tarjeta;
    }

    public String getClabe()
    {
        return clabe;
    }

    public void setClabe(String clabe)
    {
        this.clabe = clabe;
    }

    public double getSaldo()
    {
        return saldo;
    }

    public void setSaldo(double saldo)
    {
        this.saldo = saldo;
    }

    public int getUserID()
    {
        return userID;
    }

    public void setUserID(int userID)
    {
        this.userID = userID;
    }

    @NonNull
    @Override
    public String toString()
    {
        return String.format("id: %d, numero: %s, tarjeta: %s, clabe: %s, saldo: %f, userID: %d",
                getId(), getNumero(), getTarjeta(), getClabe(), getSaldo(), getUserID());
    }
}
