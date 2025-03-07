using GPS.ApplicationManager.Web.Controllers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace GPS.ApplicationManager.Web.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApplicationManagerController : ControllerBase
  {
    private readonly ILogger<ApplicationManagerController> _logger;
    private static readonly string _filePath = "loanApplication.json";

    public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
    {
      _logger = logger;
    }

    private async static Task<List<LoanApplication>> GetApplicationsFromFileAsync()
    {
      if (System.IO.File.Exists(_filePath))
      {
        var existingJson = await System.IO.File.ReadAllTextAsync(_filePath);
        return JsonSerializer.Deserialize<List<LoanApplication>>(existingJson) ?? new List<LoanApplication>();
      }
      return new List<LoanApplication>();
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> CreateApplication([FromBody] LoanApplication loanApplication)
    {
      if (loanApplication == null ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Name.First) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Name.Last) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.PhoneNumber) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Email) ||
          string.IsNullOrEmpty(loanApplication.ApplicationNumber) ||
          loanApplication.LoanTerms.Amount <= 0)
      {
        return BadRequest("Invalid application data. All fields are required and must be valid.");
      }

      loanApplication.DateApplied = DateTime.UtcNow;
      var applications = await GetApplicationsFromFileAsync();
      applications.Add(loanApplication);
      var json = JsonSerializer.Serialize(applications);
      await System.IO.File.WriteAllTextAsync(_filePath, json);
      return Ok(new { message = "Created Successfully." });
    }

    // TODO: Add your CRUD (Read, Update, Delete) methods here:
    // Read
    [HttpGet]
    public async Task<IActionResult> GetAllApplications()
    {
        var applications = await GetApplicationsFromFileAsync();
        return Ok(applications);
    }

    // Read one
    [HttpGet("{applicationNumber}")]
    public async Task<IActionResult> GetApplicationByNumber(string applicationNumber)
    {
        var applications = await GetApplicationsFromFileAsync();
        var application = applications.FirstOrDefault(a => a.ApplicationNumber == applicationNumber);

        if (application == null)
        {
            return NotFound($"Application with number {applicationNumber} not found.");
        }

        return Ok(application);
    }

    // Update
    [HttpPut("{applicationNumber}")]
    public async Task<IActionResult> UpdateApplication(string applicationNumber, [FromBody] LoanApplication updatedApplication)
    {
        if (updatedApplication == null || applicationNumber != updatedApplication.ApplicationNumber)
        {
            return BadRequest("Invalid application data.");
        }

        var applications = await GetApplicationsFromFileAsync();
        var existingApplicationIndex = applications.FindIndex(a => a.ApplicationNumber == applicationNumber);

        if (existingApplicationIndex == -1)
        {
            return NotFound($"Application with number {applicationNumber} not found.");
        }

        updatedApplication.DateApplied = applications[existingApplicationIndex].DateApplied;

        applications[existingApplicationIndex] = updatedApplication;

        var json = JsonSerializer.Serialize(applications);
        await System.IO.File.WriteAllTextAsync(_filePath, json);

        return Ok(new { message = "Application updated successfully." });
    }

    // Delete
    [HttpDelete("{applicationNumber}")]
    public async Task<IActionResult> DeleteApplication(string applicationNumber)
    {
        var applications = await GetApplicationsFromFileAsync();
        var applicationToRemove = applications.FirstOrDefault(a => a.ApplicationNumber == applicationNumber);

        if (applicationToRemove == null)
        {
            return NotFound($"Application with number {applicationNumber} not found.");
        }

        applications.Remove(applicationToRemove);

        var json = JsonSerializer.Serialize(applications);
        await System.IO.File.WriteAllTextAsync(_filePath, json);

        return Ok(new { message = "Application deleted successfully." });
    }
  }
}
