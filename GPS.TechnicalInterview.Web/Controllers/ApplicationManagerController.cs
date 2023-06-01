using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using GPS.ApplicationManager.Web.Models;
using GPS.ApplicationManager.Web.Data;

namespace GPS.ApplicationManager.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ApplicationManagerController : ControllerBase
  {
    private readonly ILogger<ApplicationManagerController> _logger;
    private Store store;

    public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
    {
      _logger = logger;
      store = new Store();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      IEnumerable<Application> applications = store.getAllApplications();
      return Ok(applications);
    }

    [HttpGet]
    [Route("{applicationNumber}")]
    public IActionResult Get([FromRoute] string applicationNumber)
    {
      IEnumerable<Application> applications = store.getApplication(applicationNumber);
      return Ok(applications);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Application application)
    {
      store.createApplication(application);
      return Ok();
    }

    [HttpPut]
    [Route("{applicationNumber}")]
    public IActionResult Update([FromRoute] string applicationNumber, [FromBody] Application application)
    {
      application.ApplicationNumber = applicationNumber;
      store.updateApplication(applicationNumber, application);
      return Ok();
    }

    [HttpDelete]
    [Route("{applicationNumber}")]
    public IActionResult Delete([FromRoute] string applicationNumber)
    {
      store.deleteApplication(applicationNumber);
      return Ok();
    }
  }
}
