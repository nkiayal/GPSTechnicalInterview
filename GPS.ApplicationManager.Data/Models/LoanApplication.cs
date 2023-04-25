using System;

namespace GPS.ApplicationManager.Data.Models
{
    public class LoanApplication
    {
        public string ApplicationNumber { get; init; }
        public LoanTerms LoanTerms { get; init; }
        public PersonalInformation PersonalInformation { get; init; }
        public DateTime DateApplied { get; init; }
        public Status Status { get; init; }

        public LoanApplication(string applicationNumber, LoanTerms loanTerms, PersonalInformation personalnformation, DateTime dateApplied, Status status)
        {
            ApplicationNumber = applicationNumber;
            LoanTerms = loanTerms;
            PersonalInformation = personalnformation;    
            DateApplied = dateApplied;
            Status = status;
        }
    }
}
