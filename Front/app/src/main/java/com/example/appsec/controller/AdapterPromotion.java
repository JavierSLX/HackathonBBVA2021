package com.example.appsec.controller;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.toolbox.NetworkImageView;
import com.bumptech.glide.Glide;
import com.example.appsec.R;
import com.example.appsec.model.Promotion;
import com.example.appsec.resources.Constants;

import java.util.List;

public class AdapterPromotion extends RecyclerView.Adapter<AdapterPromotion.PromotionViewHolder>
{
    private List<Promotion> lista;
    private Context context;

    public AdapterPromotion(List<Promotion> lista)
    {
        this.lista = lista;
    }

    @NonNull
    @Override
    public PromotionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
    {
        context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.promotion_card, parent, false);
        return new PromotionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PromotionViewHolder holder, int position)
    {
        holder.txtTitulo.setText(lista.get(position).getTitulo());
        holder.txtPromotion.setText(lista.get(position).getDescription());

        String enlace = Constants.HOST + "imagen?elemento=" + lista.get(position).getImage();
        Log.d("imagen", enlace);

        //Carga la imagen con la biblioteca Glide
        Glide.with(context).load(enlace).centerCrop().placeholder(R.drawable.elemento).into(holder.imgPromotion);
    }

    @Override
    public int getItemCount()
    {
        return lista.size();
    }

    public static class PromotionViewHolder extends RecyclerView.ViewHolder
    {
        TextView txtPromotion, txtTitulo;
        ImageView imgPromotion;

        public PromotionViewHolder(@NonNull View itemView)
        {
            super(itemView);

            txtTitulo = itemView.findViewById(R.id.txtTitulo);
            txtPromotion = itemView.findViewById(R.id.txtPromotion);
            imgPromotion = itemView.findViewById(R.id.imgPromotion);
        }
    }
}
