using System.Collections.Generic;

using GPS.ApplicationManager.Web.Models;
namespace GPS.ApplicationManager.Web.Data;
using GPS.ApplicationManager.Web.Util;
using GPS.ApplicationManager.Web.Data.Interfaces.Repositories;
using System;
using Newtonsoft.Json;

// This is going to use the new JSonDB Util
public class LoanApplicationRepository : ILoanApplicationRepository
{

    private readonly static string _collection = "applications";

    public LoanApplicationRepository()
    {

    }

    public List<LoanApplication> GetLoanApplications()
    {
        var client = new JsonDB();
        return client.ReadAll(_collection);
    }

    public LoanApplication CreateLoanApplicationById(LoanApplication application)
    {
        var client = new JsonDB();
        return client.Create(_collection, application);
    }

    public LoanApplication UpdateById(LoanApplication application)
    {

        Console.WriteLine(JsonConvert.SerializeObject(application));
        var client = new JsonDB();
        return client.UpdateById(_collection, application);
    }

    public bool DeleteById(string id)
    {
        var client = new JsonDB();
        return client.Delete(_collection, id);
    }
}