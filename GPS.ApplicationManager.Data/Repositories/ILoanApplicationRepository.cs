using GPS.ApplicationManager.Data.Models;
using System;
using System.Threading.Tasks;

namespace GPS.ApplicationManager.Data.Repositories
{
    public interface ILoanApplicationRepository
    {
        Task CreateLoanApplicationAsync(LoanApplication loanApplication);
        Task UpdateLoanApplicationAsync(LoanApplication loanApplication);
        Task DeleteLoanApplicationAsync(string applicationNumber);
        LoanApplication GetLoanApplicationByApplicationNumber(string applicationNumber);

        IEnumerable<LoanApplication> GetLoanApplications();
    }
}
