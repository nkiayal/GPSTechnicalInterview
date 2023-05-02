using System.Text.Json;
using Newtonsoft.Json;
using GPS.ApplicationManager.Web.Models;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using static System.Net.Mime.MediaTypeNames;


namespace GPS.ApplicationManager.Web.Util;

public class JsonDB
{
    private readonly string _dir = "./Db/";

    public LoanApplication ReadById(string collection, string id)
    {
        using StreamReader reader = new($"{_dir}{collection}-collection.json");

        var results = reader.ReadToEnd();
        List<LoanApplication> applications = JsonConvert.DeserializeObject<List<LoanApplication>>(results);

        return applications.FindAll(e => e.ApplicationNumber == id).First();
    }

    public List<LoanApplication> ReadAll(string collection)
    {
        using StreamReader reader = new($"{_dir}/{collection}-collection.json");

        var results = reader.ReadToEnd();

        List<LoanApplication> applications = JsonConvert.DeserializeObject<List<LoanApplication>>(results);

        return applications;
    }

    public LoanApplication UpdateById(string collection, LoanApplication application)
    {
        using StreamReader reader = new($"{_dir}/{collection}-collection.json");

        var results = reader.ReadToEnd();

        List<LoanApplication> applications = JsonConvert.DeserializeObject<List<LoanApplication>>(results);

        var index = applications.IndexOf(applications.Find(app => app.ApplicationNumber == application.ApplicationNumber));
        applications[index] = application;

        File.WriteAllText($"{_dir}{collection}-collection.json", JsonConvert.SerializeObject(applications));

        return application;
    }

    public bool Delete(string collection, string id)
    {
        try
        {
            using StreamReader reader = new($"{_dir}/{collection}-collection.json");

            var results = reader.ReadToEnd();

            List<LoanApplication> applications = JsonConvert.DeserializeObject<List<LoanApplication>>(results);

            applications.RemoveAll(e => e.ApplicationNumber == id);

            File.WriteAllText($"{_dir}{collection}-collection.json", JsonConvert.SerializeObject(applications));

            return true;
        }
        catch (Exception e)
        {
            // TODO: log error
            return false;
        }
    }

    public LoanApplication Create(string collection, LoanApplication application)
    {
        try
        {
            var objExists = ReadById(collection, application.ApplicationNumber);
            return null;
        }
        catch (InvalidOperationException e)
        {
            var applications = ReadAll(collection);
            applications.Add(application);
            File.WriteAllText($"{_dir}/{collection}-collection.json", JsonConvert.SerializeObject(applications));
            return application;
        }
    }
}