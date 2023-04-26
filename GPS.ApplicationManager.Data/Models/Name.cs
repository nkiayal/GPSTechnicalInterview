using System.ComponentModel.DataAnnotations;

namespace GPS.ApplicationManager.Data.Models
{
    public class Name
    {
        [Required]
        public string First { get; init; }

        [Required]
        public string Last { get; init; }

        public Name(string first, string last) 
        { 
            First = first;
            Last = last;
        }
    }
}
