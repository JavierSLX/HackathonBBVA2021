package com.example.appsec.controller;

import android.content.Context;
import android.util.Log;

import com.android.volley.toolbox.StringRequest;
import com.example.appsec.model.Request;
import com.example.appsec.model.User;
import com.example.appsec.resources.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
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
        url += "getuser";

        JSONObject params = new JSONObject();

        try {
            params.put("id", id);
        }catch (JSONException e)
        {
            Log.d("json", e.toString());
        }

        Request.POST post = new Request.POST(context, url, params);
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
}
