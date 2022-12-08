using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GPS.ApplicationManager.Web
{
    public class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        private const string Format = "yyyy/MM/dd";

        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return DateOnly.ParseExact(reader.GetString(), Format, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
        }
    }
    public class LoanTerms
    {
        [Key]
        [Required]
        public double Amount { get; set; }
        [Required]
        public double MonthlyPaymentAmount { get; set; }
        [Required]
        public uint terms { get; set; }

    }
    public class Name
    {
        [Key]
        [Required]
        public string First { get; set; }
        [Required]
        public string Last { get; set; }
    }
    public class PersonalInfo
    {
        [Key]
        [Required]
        public Name Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }

    }
    public enum Status
    {
        New,
        Approved,
        Funded
    }
    public class LoanApplication
    {
        [Key]
        [Required]
        public string ApplicationNumber { get; set; }
        [Required]
        public LoanTerms loanTerms { get; set; }
        [Required]
        public PersonalInfo PersonalInformation { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateApplied { get; set; }
        [Required]
        public Status Status { get; set; }

    }
}
