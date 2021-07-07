package com.example.appsec.controller;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.appsec.R;
import com.example.appsec.model.Account;

import java.text.DecimalFormat;
import java.util.List;

public class AdapterAccount extends RecyclerView.Adapter<AdapterAccount.AccountViewHolder>
{
    private DecimalFormat decimalFormat = new DecimalFormat("###,##0.00");
    private List<Account> lista;

    public AdapterAccount(List<Account> lista)
    {
        this.lista = lista;
    }

    @NonNull
    @Override
    public AccountViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
    {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.account_card, parent, false);
        return new AccountViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AccountViewHolder holder, int position)
    {
        holder.txtSaldo.setText("$"+String.valueOf(decimalFormat.format(lista.get(position).getSaldo())));

        String cuenta = lista.get(position).getNumero();
        cuenta = cuenta.substring(6);
        holder.txtCuenta.setText(String.format("*%s", cuenta));
    }

    @Override
    public int getItemCount()
    {
        return lista.size();
    }

    public static class AccountViewHolder extends RecyclerView.ViewHolder
    {
        TextView txtSaldo, txtCuenta;

        public AccountViewHolder(@NonNull View itemView)
        {
            super(itemView);
            txtSaldo = itemView.findViewById(R.id.txtSaldo);
            txtCuenta = itemView.findViewById(R.id.txtCuenta);
        }
    }
}
