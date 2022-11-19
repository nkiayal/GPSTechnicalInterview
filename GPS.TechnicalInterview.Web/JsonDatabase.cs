using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GPS.ApplicationManager.Web
{
    //need to simulate crud calls to the database
    public class JsonDatabase
    {
        string JsonFile = System.IO.File.ReadAllText("./database.json");
        
        //get all applications
        public async Task<List<LoanApplication>> GetApp()
        {
            Task<List<LoanApplication>> loanApps = JsonConvert.DeserializeObject<Task<List<LoanApplication>>>(JsonFile);
            var result = await loanApps;
            return result;
        }
        //get one application
        public async Task<LoanApplication> GetOneApp(string ApplicationNumber)
        {
            var loanApps = await GetApp();
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
        //save an application
        public async Task SaveApplication(LoanApplication loanForm)
        {
            var loanApps = await GetApp();
            loanApps.Add(loanForm);
            var output = JsonConvert.SerializeObject(loanApps);
            System.IO.File.WriteAllText("./database.json", output);
            Console.WriteLine("Application Saved");
        }
        //delete an application
        public async Task deleteApplication(string ApplicationNum)
        {
            var loanApps = await GetApp();
            loanApps.Remove(await GetOneApp(ApplicationNum));
            Console.WriteLine("Application Removed");
        }
    }
}
