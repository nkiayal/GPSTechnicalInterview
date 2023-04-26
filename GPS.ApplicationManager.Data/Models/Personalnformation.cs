using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Data.Models

{
    public class PersonalInformation
    {
        [Required]
        public Name Name { get; init; }

        [Required]
        [MinLength(9)]
        [MaxLength(9)]
        public string PhoneNumber { get; init; }

        [Required]
        [EmailAddress]
        public string Email { get; init; }

        public PersonalInformation(Name name, string phoneNumber, string email)
        {
            Name = name;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
