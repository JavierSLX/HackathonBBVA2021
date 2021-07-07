package com.example.appsec.controller;

import android.content.Context;
import android.util.Log;

import com.android.volley.toolbox.StringRequest;
import com.example.appsec.model.Account;
import com.example.appsec.model.Request;
import com.example.appsec.model.User;
import com.example.appsec.resources.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserDAO
{
    public static UserDAO dao;
    private String url;

    private UserDAO()
    {
        this.url = Constants.HOST;
    }

    public static UserDAO getInstance()
    {
        if(dao == null)
            dao = new UserDAO();

        return dao;
    }

    //Permite obtener los datos de usuario a partir de su id
    public StringRequest getUser(Context context, int id, final Request.OnResultElementListener<User> listener)
    {
        String enlace = url + "getuser";

        JSONObject params = new JSONObject();

        try {
            params.put("id", id);
        }catch (JSONException e)
        {
            Log.d("json", e.toString());
        }

        Request.POST post = new Request.POST(context, enlace, params);
        return post.getResponse(new Request.OnRequestListener<String>()
        {
            @Override
            public void onSucess(String response)
            {
                try
                {
                    JSONObject object = new JSONObject(response);
                    JSONObject userObject = object.getJSONObject("data");
                    User user = new User(userObject.getInt("id"), userObject.getString("nombre"), userObject.getString("apellido"));
                    listener.onSucess(user);
                }catch (JSONException e)
                {
                    listener.onSucess(null);
                }
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                listener.onFailed(error, statusCode);
            }
        }, "getuser");
    }

    //Permite realizar un logeo a partir del id y del pass
    public StringRequest getUserCredentialID(Context context, int id, String pass, final Request.OnResultElementListener<Integer> listener)
    {
        String enlace = url + "getaccess";

        JSONObject params = new JSONObject();

        try
        {
            params.put("id", id);
            params.put("pass", pass);
        }catch (JSONException e)
        {
            Log.d("json", e.toString());
        }

        Request.POST post = new Request.POST(context, enlace, params);
        return post.getResponse(new Request.OnRequestListener<String>()
        {
            @Override
            public void onSucess(String response)
            {
                try {
                    JSONObject object = new JSONObject(response);
                    int id = object.getJSONObject("data").getInt("id");
                    listener.onSucess(id);
                }catch (JSONException e)
                {
                    listener.onSucess(null);
                }
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                listener.onFailed(error, statusCode);
            }
        }, "getaccess");
    }

    //Permite obtener los datos bancarios de un usuario
    public StringRequest getUserAccounts(Context context, int id, final Request.OnResultListListener<Account> listener)
    {
        String enlace = url + "getaccounts" + "?id=" + id;

        Request.GET get = new Request.GET(context, enlace);
        return get.getResponse(new Request.OnRequestListener<String>()
        {
            @Override
            public void onSucess(String response)
            {
                Log.d("accounts", response);
                try {
                    JSONObject responseJson = new JSONObject(response);
                    JSONArray respuesta = responseJson.getJSONArray("data");
                    List<Account> lista = new ArrayList<>();

                    for(int i = 0; i < respuesta.length(); i++)
                    {
                        JSONObject object = respuesta.getJSONObject(i);
                        Account account = new Account(object.getInt("id"), object.getString("numero"), object.getString("tarjeta"),
                                object.getString("clabe"), object.getDouble("saldo"), object.getInt("user_id"));
                        lista.add(account);
                    }

                    listener.onSucess(lista);
                }catch (JSONException e)
                {
                    listener.onSucess(null);
                }
            }

            @Override
            public void onFailed(String error, int statusCode)
            {
                listener.onFailed(error, statusCode);
            }
        }, "getaccounts");
    }
}
