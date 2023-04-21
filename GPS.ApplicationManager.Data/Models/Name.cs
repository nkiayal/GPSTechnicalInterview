namespace GPS.ApplicationManager.Data.Models
{
    public class Name
    {
        public string First { get; init; }
        public string Last { get; init; }

        public Name(string first, string last) 
        { 
            First = first;
            Last = last;
        }
    }
}
