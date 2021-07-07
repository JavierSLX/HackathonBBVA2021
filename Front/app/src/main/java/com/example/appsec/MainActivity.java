package com.example.appsec;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.appsec.controller.UserDAO;
import com.example.appsec.model.Request;
import com.example.appsec.model.User;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;

public class MainActivity extends AppCompatActivity
{
    private TextView txtUser;
    private TextInputEditText edtPass;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txtUser = findViewById(R.id.txtUsuario);
        edtPass = findViewById(R.id.edtPass);
        Button btEntrar = findViewById(R.id.btEntrar);
        progressBar = findViewById(R.id.progressBar);

        //Obtiene el usuario guardado en memoria
        getData();

        //Eventos
        btEntrar.setOnClickListener(eventEntrar);
    }

    //Evento de cuando se presiona el botón de Entrar
    private View.OnClickListener eventEntrar = new View.OnClickListener()
    {
        @Override
        public void onClick(final View v)
        {
            progressBar.setVisibility(View.VISIBLE);

            //Manda llamar la API de acceso
            UserDAO.getInstance().getUserCredentialID(MainActivity.this,1, edtPass.getText().toString(), new Request.OnResultElementListener<Integer>()
            {
                @Override
                public void onSucess(Integer response)
                {
                    progressBar.setVisibility(View.GONE);
                    if(response > 0)
                    {
                        //Manda a la siguiente actividad si el logeo se logra
                        Intent intent = new Intent(MainActivity.this, AccountActivity.class);
                        intent.putExtra("ID", 1);
                        intent.putExtra("nombre", txtUser.getText().toString());
                        startActivity(intent);
                    }
                    else
                    {
                        Snackbar snackbar = Snackbar.make(v, "Credenciales incorrectas", Snackbar.LENGTH_LONG);
                        snackbar.show();
                    }
                }

                @Override
                public void onFailed(String error, int statusCode)
                {
                    progressBar.setVisibility(View.GONE);
                    Log.e("user", String.format("Error: %s, Code: %d", error, statusCode));
                }
            });
        }
    };

    //Datos iniciales obtenidos por API
    private void getData()
    {
        progressBar.setVisibility(View.VISIBLE);

        UserDAO.getInstance().getUser(MainActivity.this, 1, new Request.OnResultElementListener<User>(){
            @Override
            public void onSucess(User response)
            {
                progressBar.setVisibility(View.GONE);
                Log.d("user", response.toString());
                txtUser.setText(response.getNombre());
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
