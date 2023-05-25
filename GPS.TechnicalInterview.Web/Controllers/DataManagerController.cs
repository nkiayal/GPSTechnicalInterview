using System;
using System.Collections.Generic;
using System.IO;

using GPS.ApplicationManager.Web.Models;
using Newtonsoft.Json;

namespace GPS.ApplicationManager.Web.Controllers;

public class DataManagerController
{
    private readonly string filePath;

    public DataManagerController(string filePath)
    {
        this.filePath = filePath;
    }

    public void Create(Application application)
    {
        var applications = GetAllApplications();
        
        var guid = Guid.NewGuid().ToString();
        application.ApplicationNumber = guid;
        
        applications.Add(application);
        SaveApplications(applications);
    }

    public List<Application> GetAllApplications()
    {
        if (File.Exists(filePath))
        {
            var json = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<List<Application>>(json);
        }
        else
        {
            return new List<Application>();
        }
    }

    public void Update(Application application)
    {
        var applications = GetAllApplications();
        var existingApplication = applications.Find(a => a.ApplicationNumber == application.ApplicationNumber);
        if (existingApplication != null)
        {
            existingApplication.LoanTerms = application.LoanTerms;
            existingApplication.PersonalInformation = application.PersonalInformation;
            existingApplication.DateApplied = application.DateApplied;
            existingApplication.Status = application.Status;
            SaveApplications(applications);
        }
    }

    public void Delete(string applicationNumber)
    {
        var applications = GetAllApplications();
        var applicationToRemove = applications.Find(a => a.ApplicationNumber == applicationNumber);
        if (applicationToRemove != null)
        {
            applications.Remove(applicationToRemove);
            SaveApplications(applications);
        }
    }

    private void SaveApplications(List<Application> applications)
    {
        var json = JsonConvert.SerializeObject(applications);
        File.WriteAllText(filePath, json);
    }
}