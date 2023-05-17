using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using GPS.ApplicationManager.Web.Models;
using GPS.ApplicationManager.Web.Repositories;

namespace GPS.ApplicationManager.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationManagerController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;
        private readonly ApplicationRepository _repository;

        public ApplicationManagerController(ILogger<ApplicationManagerController> logger, ApplicationRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        // GET: /ApplicationManager
        [HttpGet]
        public IActionResult GetAllApplications()
        {
            var applications = _repository.GetAllApplications();
            return Ok(applications);
        }

        // GET: /ApplicationManager/{applicationNumber}
        [HttpGet("{applicationNumber}")]
        public IActionResult GetApplication(string applicationNumber)
        {
            var application = _repository.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
            if (application == null)
                return NotFound();

            return Ok(application);
        }

        // POST: /ApplicationManager
        [HttpPost]
        public IActionResult CreateApplication(Application application)
        {
            if (ModelState.IsValid)
            {
                _repository.Create(application);
                return CreatedAtAction(nameof(GetApplication), new { applicationNumber = application.ApplicationNumber }, application);
            }

            return BadRequest(ModelState);
        }

        // PUT: /ApplicationManager/{applicationNumber}
        [HttpPut("{applicationNumber}")]
        public IActionResult UpdateApplication(string applicationNumber, Application application)
        {
            if (ModelState.IsValid)
            {
                var existingApplication = _repository.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
                if (existingApplication == null)
                    return NotFound();

                application.ApplicationNumber = existingApplication.ApplicationNumber; // Preserve the original application number
                _repository.Update(application);
                return NoContent();
            }

            return BadRequest(ModelState);
        }

        // DELETE: /ApplicationManager/{applicationNumber}
        [HttpDelete("{applicationNumber}")]
        public IActionResult DeleteApplication(string applicationNumber)
        {
            var existingApplication = _repository.GetAllApplications().Find(a => a.ApplicationNumber == applicationNumber);
            if (existingApplication == null)
                return NotFound();

            _repository.Delete(applicationNumber);
            return NoContent();
        }
    }
}
