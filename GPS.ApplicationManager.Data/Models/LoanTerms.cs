using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Data.Models

{
    public class LoanTerms
    {
        [Required]
        public double Amount {get; init;}

        [Required]
        public double MonthlyPaymentAmount { get; init; }

        [Required]
        public uint Term { get; init; }

        public LoanTerms(double amount, double monthlyPaymentAmount, uint term) 
        {
            Amount = amount;
            MonthlyPaymentAmount = monthlyPaymentAmount;
            Term = term;
        }
    }
}
