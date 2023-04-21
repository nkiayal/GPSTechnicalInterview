using System;

namespace GPS.ApplicationManager.Data.Models
{
    public class LoanApplication
    {
        public string ApplicationNumber { get; init; }
        public LoanTerms LoanTerms { get; init; }
        public Personalnformation Personalnformation { get; init; }
        public DateTime DateApplied { get; init; }
        public Status Status { get; init; }

        public LoanApplication(string applicationNumber, LoanTerms loanTerms, Personalnformation personalnformation, DateTime dateApplied, Status status)
        {
            ApplicationNumber = applicationNumber;
            LoanTerms = loanTerms;
            Personalnformation = personalnformation;    
            DateApplied = dateApplied;
            Status = status;
        }
    }
}
