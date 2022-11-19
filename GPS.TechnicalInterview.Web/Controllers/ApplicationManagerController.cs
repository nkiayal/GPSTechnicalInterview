using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GPS.ApplicationManager.Web;
namespace GPS.ApplicationManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationManagerController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;

        public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
        {
            _logger = logger;
        }

        // TODO: Add your CRUD (Create, Read, Update, Delete) methods here:

        JsonDatabase database = new JsonDatabase();
        [HttpGet]
        public async Task<ActionResult<List<LoanApplication>>> Get()
        {
            var theData = await database.GetApp();
            return Ok(theData);
        }
        [HttpGet("{AppNumber}")]
        public async Task<ActionResult<LoanApplication>> GetOneApp(string AppNumber)
        {
            var theData = await database.GetOneApp(AppNumber);
            return Ok(theData);

        }
        [HttpPost]
        public async Task<ActionResult> SaveApp(LoanApplication loanApplication)
        {
            await database.SaveApplication(loanApplication);
            return Ok();
        }
        [HttpDelete("{AppNumber}")]
        public async Task<ActionResult> DeleteApp(string AppNumber)
        {
            await database.deleteApplication(AppNumber);
            return Ok();
        }
    }
}
