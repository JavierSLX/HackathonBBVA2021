package com.example.appsec.model;

import android.content.Context;
import android.util.Log;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class LogFile
{
    private static LogFile logFile;
    private String nameFile;

    private LogFile(String nameFile)
    {
        this.nameFile = nameFile;
    }

    public static LogFile getInstance(String nameFile)
    {
        if(logFile == null)
            logFile = new LogFile(nameFile);

        return logFile;
    }

    public boolean putData(Context context, String content)
    {
        try
        {
            OutputStreamWriter writer = new OutputStreamWriter(context.openFileOutput(nameFile, Context.MODE_APPEND));
            writer.write(content);
            writer.close();
            return true;
        }catch (IOException e)
        {
            Log.d("LogFile", "Error al escribir log");
            return false;
        }
    }
}
