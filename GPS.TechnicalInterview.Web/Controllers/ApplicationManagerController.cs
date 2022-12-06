using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using GPS.ApplicationManager.Web;
using Newtonsoft.Json;
using System.Net;

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
            try
            {
                var theData = database.GetApp();
                return Ok(theData);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            } 

        }
        [HttpGet("{AppNumber}")]
        public ActionResult<LoanApplication> GetOneApp(string AppNumber)
        {
            try
            {
            var theData = database.GetOneApp(AppNumber);
                return Ok(theData);

            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);  
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }

        }
        [HttpPost("saveApp")]
        public ActionResult SaveApp(LoanApplication loanApplication)
        {
            try
            {
            loanApplication.DateApplied = DateOnly.FromDateTime(DateTime.Now);
            database.SaveApplication(loanApplication);
            return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPut("{id}")]
        public ActionResult EditApp(string id, LoanApplication loanApplication)
        {
            try
            {
            database.UpdateApp(id, loanApplication);
            return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{AppNumber}")]
        public ActionResult DeleteApp(string AppNumber)
        {
            try
            {
            database.deleteApplication(AppNumber);
            return Ok();
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
