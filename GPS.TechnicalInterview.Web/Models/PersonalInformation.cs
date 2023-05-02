using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Web.Models;

public class PersonalInformation
{
    public Name Name{ get; set; }
    public string PhoneNumber { get; set; }
    public string email { get; set; }
}