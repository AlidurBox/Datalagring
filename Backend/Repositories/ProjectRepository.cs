using Backend.Entities;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _context;

        public ProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(string id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<Project> CreateAsync(Project project)
        {
            // Skapa projektnummer om det saknas
            if (string.IsNullOrEmpty(project.ProjectNumber))
            {
                var lastProject = await _context.Projects
                    .OrderByDescending(p => p.ProjectNumber)
                    .FirstOrDefaultAsync();

                int nextNumber = 101;
                if (lastProject != null && lastProject.ProjectNumber.StartsWith("P-"))
                {
                    int.TryParse(lastProject.ProjectNumber.Substring(2), out nextNumber);
                    nextNumber++;
                }

                project.ProjectNumber = $"P-{nextNumber}";
            }

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task UpdateAsync(Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }
    }
}
