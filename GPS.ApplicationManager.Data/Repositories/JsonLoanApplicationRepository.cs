using GPS.ApplicationManager.Data.Models;
using GPS.ApplicationManager.Data.Repositories;
using JsonFlatFileDataStore;

namespace GPS.ApplicationManager.Data.Repositories
{
    public class JsonLoanApplicationRepository : ILoanApplicationRepository
    {
        private string _jsonFilePath;
        private DataStore _store;

        public JsonLoanApplicationRepository(string jsonFilePath) 
        { 
            _jsonFilePath= jsonFilePath;

            _store = new DataStore(_jsonFilePath);
        }

        public async Task CreateLoanApplicationAsync(LoanApplication loanApplication)
        {
            var collection = _store.GetCollection<LoanApplication>();

            await collection.InsertOneAsync(loanApplication);
        }

        public async Task DeleteLoanApplicationAsync(string loanAppNumber)
        {
            var collection = _store.GetCollection<LoanApplication>();

            await collection.DeleteOneAsync(loanApp => loanApp.ApplicationNumber == loanAppNumber);
        }

        public LoanApplication GetLoanApplicationByApplicationNumber(string applicationNumber)
        {
            var collection = _store.GetCollection<LoanApplication>();

            LoanApplication loanApplication = collection.AsQueryable().FirstOrDefault(loanApp => loanApp.ApplicationNumber == applicationNumber) ?? throw new Exception($"Loan application with application number {applicationNumber} not found");

            return loanApplication;
        }

        public async Task UpdateLoanApplicationAsync(LoanApplication loanApplication)
        {
            var collection = _store.GetCollection<LoanApplication>();

            await collection.ReplaceOneAsync(loanApp => loanApp.ApplicationNumber == loanApplication.ApplicationNumber, loanApplication);
        }
    }
}
