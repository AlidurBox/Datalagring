using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class Project
    {
        [Key]
        public string ProjectNumber { get; set; } = string.Empty;

        [Required]
        public string? Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? ProjectManager { get; set; }

        public string? Customer { get; set; }

        public string? Service { get; set; }

        public decimal TotalPrice { get; set; }

        public string? Status { get; set; }
    }
}
