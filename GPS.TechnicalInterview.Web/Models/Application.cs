using System;

namespace GPS.ApplicationManager.Web.Models;

public class Application
{
    public string? ApplicationNumber { get; set; }
    public LoanTerms LoanTerms { get; set; }
    public PersonalInformation PersonalInformation { get; set; }
    public DateTime DateApplied { get; set; }
    public StatusEnum Status { get; set; }
}