package com.example.appsec;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.example.appsec.controller.AdapterPromotion;
import com.example.appsec.controller.UserDAO;
import com.example.appsec.model.Promotion;
import com.example.appsec.model.Request;
import com.example.appsec.resources.Constants;

import java.util.List;

public class PromotionActivity extends AppCompatActivity
{
    private int id;
    private RecyclerView rcPromotions;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_promotion);

        Intent intent = getIntent();
        id = intent.getIntExtra("ID", 0);

        rcPromotions = findViewById(R.id.rcvPromotions);
        rcPromotions.setHasFixedSize(true);
        rcPromotions.setLayoutManager(new LinearLayoutManager(this));

        getData();
    }

    //Obtiene los datos iniciales de la actividad
    private void getData()
    {
        UserDAO.getInstance().getPromotions(this, id, new Request.OnResultListListener<Promotion>()
        {
            @Override
            public void onSucess(List<Promotion> response)
            {
                rcPromotions.setAdapter(new AdapterPromotion(response));
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                Log.e("promotion", String.format("Error: %s, Code: %d", error, statusCode));
            }
        });
    }
}
