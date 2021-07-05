package com.example.appsec;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.appsec.controller.UserDAO;
import com.example.appsec.model.Request;
import com.example.appsec.model.User;
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
        public void onClick(View v)
        {
            AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
            builder.setMessage("Hola").setPositiveButton("OK", new DialogInterface.OnClickListener()
            {
                @Override
                public void onClick(DialogInterface dialog, int which)
                {
                    dialog.cancel();
                }
            });

            AlertDialog dialog = builder.create();
            dialog.show();
        }
    };

    //Datos iniciales obtenidos por API
    private void getData()
    {
        progressBar.setVisibility(View.VISIBLE);

        UserDAO.getInstance().getUser(this, 1, new Request.OnResultElementListener<User>(){
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
                Log.e("user", String.format("Error: %s, Code: %d", error, statusCode));
            }
        });
    }
}
