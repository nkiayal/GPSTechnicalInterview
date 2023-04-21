namespace GPS.ApplicationManager.Data.Models

{
    public class LoanTerms
    {
        public int AmountDollars { get; init; }
        public int AmountCents { get; init; }
        public int MonthlyPaymentAmountDollars { get; init; }
        public int MonthlyPaymentAmountCents { get; init; }
        public uint Term { get; init; }

        public LoanTerms(int amountDollars, int amountCents, int monthlyPaymentDollars, int monthlyPaymentCents, uint term) 
        {
            AmountDollars = amountDollars;
            AmountCents = amountCents;
            MonthlyPaymentAmountDollars = monthlyPaymentDollars;
            MonthlyPaymentAmountCents = monthlyPaymentCents;
            Term = term;
        }
    }
}
