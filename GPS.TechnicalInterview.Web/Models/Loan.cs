using System;
using GPS.ApplicationManager.Web.Models;

namespace GPS.ApplicationManager.Web.Models
{
	public enum LoanStatus
	{
		New,
		Approved,
		Funded,
	}
	public class Loan
	{
		public uint CentsAmount { get; set; }
		public float Terms { get; set; }
		public LoanStatus Status { get; set; }
	}
}
