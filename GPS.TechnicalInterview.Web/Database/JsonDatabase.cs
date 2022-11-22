using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace GPS.ApplicationManager.Web
{
    public class JsonDatabase
    {
        string JsonFile = File.ReadAllText("./database/database.json");

        //get all applications
        public string GetApp()
        {
            var loanApps = JsonConvert.DeserializeObject<List<LoanApplication>>(JsonFile);
            var result = JsonConvert.SerializeObject(loanApps);
            return result;
        }
        //get one application
        public LoanApplication GetOneApp(string ApplicationNumber)
        {
            var loanApps = JsonConvert.DeserializeObject<List<LoanApplication>>(GetApp());
            LoanApplication oneApp = null;
            loanApps.ForEach(app =>
            {
                if (app.ApplicationNumber == ApplicationNumber)
                {
                    oneApp = app;
                }
            });
            return oneApp;
        }
        public void UpdateApp(string id, LoanApplication loanForm)
        {
            var loanApps = JsonConvert.DeserializeObject<List<LoanApplication>>(GetApp());
            loanApps.Remove(loanApps.Find(apps => apps.ApplicationNumber == id));
            loanApps.Add(loanForm);
            var output = JsonConvert.SerializeObject(loanApps);
            if (File.Exists("./database/database.json"))
            {
                File.Delete("./database/database.json");
            }
            File.WriteAllText("./database/database.json", output);
        }
        //save an application
        public void SaveApplication(LoanApplication loanForm)
        {
            var loanApps = JsonConvert.DeserializeObject<List<LoanApplication>>(GetApp());
            loanForm.DateApplied = DateOnly.FromDateTime(DateTime.Now);
            loanApps.Add(loanForm);
            var output = JsonConvert.SerializeObject(loanApps);
            if (File.Exists("./database/database.json"))
            {
                File.Delete("./database/database.json");
            }
            File.WriteAllText("./database/database.json", output);
        }
        //delete an application
        public void deleteApplication(string ApplicationNum)
        {
            var loanApps = JsonConvert.DeserializeObject<List<LoanApplication>>(GetApp());
            loanApps.RemoveAll(x=>x.ApplicationNumber == ApplicationNum);
            var output = JsonConvert.SerializeObject(loanApps);
            Console.WriteLine(output);
            if (File.Exists("./database/database.json"))
            {
                File.Delete("./database/database.json");
            }
            File.WriteAllText("./database/database.json", output);
        }
    }
}
