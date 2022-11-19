using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Web
{
    public class LoanTerms
    {
        [Key]
        public double Amount { get; set; }
        public double MonthlyPaymentAmount { get; set; }
        public uint Term { get; set; }

    }
    public class Name
    {
        [Key]
        public string First { get; set; }
        public string Last { get; set; }
    }
    public class PersonalInfo
    {
        [Key]
        public Name Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

    }
    public class LoanApplication
    {
        [Key]
        public string ApplicationNumber { get; set; }    
        public LoanTerms loanTerms { get; set; }
        public PersonalInfo PersonalInformation { get; set; }
        public DateOnly DateApplied { get; set; }
        public Enum Status { get; set; }

    }
}
