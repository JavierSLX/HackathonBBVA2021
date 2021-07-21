package com.example.appsec;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;

import com.example.appsec.controller.AdapterPromotion;
import com.example.appsec.controller.UserDAO;
import com.example.appsec.model.LogFile;
import com.example.appsec.model.Promotion;
import com.example.appsec.model.Request;
import com.example.appsec.resources.Constants;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;

import java.util.List;
import java.util.Locale;

public class PromotionActivity extends AppCompatActivity
{
    private int id;
    private ProgressBar progressBar;
    private RecyclerView rcPromotions;
    private TextInputEditText edtSearch;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_promotion);

        Intent intent = getIntent();
        id = intent.getIntExtra("ID", 0);

        progressBar = findViewById(R.id.progressBar);
        edtSearch = findViewById(R.id.edtBusqueda);

        rcPromotions = findViewById(R.id.rcvPromotions);
        rcPromotions.setHasFixedSize(true);
        rcPromotions.setLayoutManager(new LinearLayoutManager(this));

        getData();

        //Evento del botón de búsqueda
        ((Button)findViewById(R.id.btBuscar)).setOnClickListener(eventButtonSearch);
    }

    //Obtiene los datos iniciales de la actividad
    private void getData()
    {
        progressBar.setVisibility(View.VISIBLE);
        UserDAO.getInstance().getPromotions(this, id, new Request.OnResultListListener<Promotion>()
        {
            @Override
            public void onSucess(List<Promotion> response)
            {
                progressBar.setVisibility(View.GONE);
                rcPromotions.setAdapter(new AdapterPromotion(response));
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                progressBar.setVisibility(View.GONE);
                Log.e("promotion", String.format("Error: %s, Code: %d", error, statusCode));
            }
        });
    }

    //Evento del botón de busqueda
    private View.OnClickListener eventButtonSearch = new View.OnClickListener()
    {
        @Override
        public void onClick(final View v)
        {
            progressBar.setVisibility(View.VISIBLE);

            final String search = edtSearch.getText().toString();
            final LogFile logFile = LogFile.getInstance(Constants.LOG);

            UserDAO.getInstance().getPromotionsSearch(PromotionActivity.this, v, id, search, new Request.OnResultListListener<Promotion>()
            {
                @Override
                public void onSucess(List<Promotion> response)
                {
                    progressBar.setVisibility(View.GONE);

                    //Se guarda en lo el resultado de la búsqueda
                    logFile.putData(PromotionActivity.this, String.format(Locale.getDefault(),"Búsqueda. ID: %d, Resultados: %d, Texto: %s\n",
                            id, response.size(), search));
                    rcPromotions.setAdapter(new AdapterPromotion(response));
                }

                @Override
                public void onFailed(String error, int statusCode)
                {
                    progressBar.setVisibility(View.GONE);

                    logFile.putData(PromotionActivity.this, String.format(Locale.getDefault(),"Búsqueda. ID: %d, Resultados: 0, Texto: %s\n",
                            id, search));
                    rcPromotions.setAdapter(null);
                    Snackbar snackbar = Snackbar.make(v, "Carga de datos incorrecta", Snackbar.LENGTH_LONG);
                    snackbar.show();
                }
            });
        }
    };
}
