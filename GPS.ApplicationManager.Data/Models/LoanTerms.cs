namespace GPS.ApplicationManager.Data.Models

{
    public class LoanTerms
    {
        public double Amount {get; init;}
        public double MonthlyPaymentAmount { get; init; }
        public uint Term { get; init; }

        public LoanTerms(double amount, double monthlyPaymentAmount, uint term) 
        {

            Term = term;
        }
    }
}
