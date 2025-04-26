using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Project> Projects { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
