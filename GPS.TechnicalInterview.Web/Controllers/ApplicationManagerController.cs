using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using GPS.ApplicationManager.Web;
using Newtonsoft.Json;

namespace GPS.ApplicationManager.Web.Controllers
{
    [Route("applicationManager")]
    [ApiController]
    public class ApplicationManagerController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;

        public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
        {
            _logger = logger;
        }

        // TODO: Add your CRUD (Create, Read, Update, Delete) methods here:

        JsonDatabase database = new JsonDatabase();
        [HttpGet("getApps")]
        public ActionResult<Array> Get()
        {
            var theData = database.GetApp();
            return Ok(theData);
        }
        [HttpGet("{AppNumber}")]
        public ActionResult<LoanApplication> GetOneApp(string AppNumber)
        {
            var theData = database.GetOneApp(AppNumber);
            return Ok(theData);

        }
        [HttpPost("saveApp")]
        public ActionResult SaveApp(LoanApplication loanApplication)
        {
            loanApplication.DateApplied = DateOnly.FromDateTime(DateTime.Now);
            Console.Write("Loan curr date: ");
            Console.WriteLine(loanApplication.DateApplied.ToString());
            database.SaveApplication(loanApplication);
            return Ok();
        }
        [HttpPut("{id}")]
        public ActionResult EditApp(string id, LoanApplication loanApplication)
        {
            database.UpdateApp(id, loanApplication);
            return Ok();
        }
        [HttpDelete("{AppNumber}")]
        public ActionResult DeleteApp(string AppNumber)
        {
            database.deleteApplication(AppNumber);
            return Ok();
        }
    }
}
