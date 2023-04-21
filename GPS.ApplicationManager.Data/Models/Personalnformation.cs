namespace GPS.ApplicationManager.Data.Models

{
    public class Personalnformation
    {
        public Name Name { get; init; }
        public string PhoneNumber { get; init; }
        public string Email { get; init; }

        public Personalnformation(Name name, string phoneNumber, string email)
        {
            Name = name;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
