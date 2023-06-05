using System;
using GPS.ApplicationManager.Web.Models;

namespace GPS.ApplicationManager.Web.Models
{
	public class Application
	{
		public string ApplicationNumber { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public Loan Loan { get; set; }
		public Profile Profile { get; set; }
	}
}
