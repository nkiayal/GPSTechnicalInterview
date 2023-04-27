using System;
using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Data.Models
{
    public class LoanApplication
    {
        [Required]
        public string ApplicationNumber { get; init; }

        [Required]
        public LoanTerms LoanTerms { get; init; }

        [Required]
        public PersonalInformation PersonalInformation { get; init; }

        [Required]
        public DateTime DateApplied { get; init; }

        [Required]
        public Status Status { get; init; }

        public LoanApplication(string applicationNumber, LoanTerms loanTerms, PersonalInformation personalInformation, DateTime dateApplied, Status status)
        {
            ApplicationNumber = applicationNumber;
            LoanTerms = loanTerms;
            PersonalInformation = personalInformation;    
            DateApplied = dateApplied;
            Status = status;
        }
    }
}
