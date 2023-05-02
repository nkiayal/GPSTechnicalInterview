using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using GPS.ApplicationManager.Web.Models;
using GPS.ApplicationManager.Web.Util;
using GPS.ApplicationManager.Web.Data.Interfaces.Repositories;
using GPS.ApplicationManager.Web.Data;
using Newtonsoft.Json;

namespace GPS.ApplicationManager.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationManagerController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;

        public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
        {
            _logger = logger;
        }

        // TODO: Add your CRUD (Create, Read, Update, Delete) methods here:
        [HttpGet(Name = "GetLoanApplication")]
        public List<LoanApplication> Get()
        {
            var applicationRepository = new LoanApplicationRepository();
            return applicationRepository.GetLoanApplications();
        }
    }

    [ApiController]
    [Route("api/application")]
    public class LoanApplicationController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;

        public LoanApplicationController(ILogger<ApplicationManagerController> logger)
        {
            _logger = logger;
        }

        [HttpPut("{id}")]
        public LoanApplication UpdateById([FromBody] LoanApplication application)
        {
            Console.WriteLine(JsonConvert.SerializeObject(application));
            var applicationRepository = new LoanApplicationRepository();
            return applicationRepository.UpdateById(application);
        }

        [HttpDelete("{id}")]
        public bool DeleteById(string id)
        {
            var applicationRepository = new LoanApplicationRepository();
            return applicationRepository.DeleteById(id);
        }

        [HttpPost]
        public LoanApplication Create([FromBody] LoanApplication application)
        {
            var applicationRepository = new LoanApplicationRepository();
            return applicationRepository.CreateLoanApplicationById(application);
        }
    }
}
