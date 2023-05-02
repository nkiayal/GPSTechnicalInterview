using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Web.Models;

public class LoanApplication
{
    public string ApplicationNumber { get; set; }
    public LoanTerms LoanTerms { get; set; }
    public PersonalInformation PersonalInformation { get; set; }
    public string DateApplied { get; set; }
    public Status Status { get; set; }
}