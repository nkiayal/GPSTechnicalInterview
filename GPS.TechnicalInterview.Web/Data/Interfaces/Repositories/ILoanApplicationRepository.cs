using System.Collections.Generic;

using GPS.ApplicationManager.Web.Models;

namespace GPS.ApplicationManager.Web.Data.Interfaces.Repositories;

public interface ILoanApplicationRepository
{
    public List<LoanApplication> GetLoanApplications();
    public LoanApplication CreateLoanApplicationById(LoanApplication application);
    public LoanApplication UpdateById(LoanApplication application);
    public bool DeleteById(string id);
}