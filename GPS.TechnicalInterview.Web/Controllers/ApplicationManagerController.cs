using GPS.ApplicationManager.Web.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace GPS.ApplicationManager.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ApplicationManagerController : ControllerBase
  {
    private readonly ILogger<ApplicationManagerController> _logger;
    private readonly DataManagerController _mockDB;

    public ApplicationManagerController(ILogger<ApplicationManagerController> logger, DataManagerController mockDB)
    {
      _logger = logger;
      _mockDB = mockDB;
    }

        // TODO: Add your CRUD (Create, Read, Update, Delete) methods here:
        
        //Get All Applications
        [HttpGet]
        public IActionResult GetAllApplications()
        {
            var applications = _mockDB.GetAllApplications();
            return Ok(applications);
        }

        // Get Specific Application
        [HttpGet("{applicationNumber}")]
        public IActionResult GetApplication(string applicationNumber)
        {
            var application = _mockDB.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
            if (application == null)
                return NotFound();

            return Ok(application);
        }

        // Add new Application
        [HttpPost]
        public IActionResult CreateApplication(Application application)
        {
            if (ModelState.IsValid)
            {
                _mockDB.Create(application);
                return CreatedAtAction(nameof(GetApplication), new { applicationNumber = application.ApplicationNumber }, application);
            }

            return BadRequest(ModelState);
        }

        //Update Specific Application
        [HttpPut("{applicationNumber}")]
        public IActionResult UpdateApplication(string applicationNumber, Application application)
        {
            if (ModelState.IsValid)
            {
                var existingApplication = _mockDB.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
                if (existingApplication == null)
                    return NotFound();

                application.ApplicationNumber = existingApplication.ApplicationNumber;
                _mockDB.Update(application);
                return Ok(application);
            }

            return BadRequest(ModelState);
        }

        //Delete Specific Application
        [HttpDelete("{applicationNumber}")]
        public IActionResult DeleteApplication(string applicationNumber)
        {
            var existingApplication = _mockDB.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
            if (existingApplication == null)
                return NotFound();

            _mockDB.Delete(applicationNumber);
            return NoContent();
        }
    }
}
