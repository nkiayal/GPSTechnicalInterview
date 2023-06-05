using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using GPS.ApplicationManager.Web.Models;
using GPS.ApplicationManager.Web.Services;

namespace GPS.ApplicationManager.Web.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApplicationManagerController : ControllerBase
  {
    private readonly ILogger<ApplicationManagerController> _logger;
    private readonly TempDataService _tempDataService;

    public ApplicationManagerController(
      ILogger<ApplicationManagerController> logger,
      TempDataService tempDataService
    )
    {
      _logger = logger;
      _tempDataService = tempDataService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Application>>> GetAllApplications()
    {
      List<Application> applications = await _tempDataService.ReadTempData();
      if (applications != null) {
        return Ok(applications);
      }
      return BadRequest();
    }

    [HttpPost]
    public async Task<ActionResult<Application>> CreateApplication(Application application)
    {
      Application createdApplication = await _tempDataService.CreateTempData(application);
      if (createdApplication != null) {
        return Ok(createdApplication);
      }
      return BadRequest();
    }

    [HttpPut("{applicationNumber}")]
    public async Task<ActionResult<Application>> UpdateApplication(string applicationNumber, Application application)
    {
      Application updatedApplication = await _tempDataService.UpdateTempData(application);
      if (updatedApplication != null) {
        return Ok(updatedApplication);
      }
      return BadRequest();
    }

    [HttpDelete("{applicationNumber}")]
    public async Task<ActionResult> DeleteApplication(string applicationNumber)
    {
      List<Application> applications = await _tempDataService.RemoveTempData(applicationNumber);
      if (applications != null) {
        return Ok();
      }
      return BadRequest();
    }
  }
}
