package com.example.appsec;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.appsec.controller.AdapterAccount;
import com.example.appsec.controller.UserDAO;
import com.example.appsec.model.Account;
import com.example.appsec.model.Request;

import java.util.List;

public class AccountActivity extends AppCompatActivity
{
    private int id;
    private String nombre;
    private RecyclerView rvCuentas;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account);

        Intent intent = getIntent();
        id = intent.getIntExtra("ID", 0);
        nombre = intent.getStringExtra("nombre");

        Log.d("intent", String.format("ID: %d, nombre: %s", id, nombre));

        progressBar = findViewById(R.id.progressBar);
        ((TextView)findViewById(R.id.txtUsuario)).setText("Hola, " + nombre);

        rvCuentas = findViewById(R.id.rvCuentas);
        rvCuentas.setHasFixedSize(true);
        rvCuentas.setLayoutManager(new LinearLayoutManager(this));

        getData();
    }

    //Obtiene los datos iniciales de la actividad
    private void getData()
    {
        progressBar.setVisibility(View.VISIBLE);
        UserDAO.getInstance().getUserAccounts(this, id, new Request.OnResultListListener<Account>()
        {
            @Override
            public void onSucess(List<Account> response)
            {
                progressBar.setVisibility(View.GONE);
                rvCuentas.setAdapter(new AdapterAccount(response));
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                progressBar.setVisibility(View.GONE);
                Log.e("user", String.format("Error: %s, Code: %d", error, statusCode));
            }
        });
    }
}
