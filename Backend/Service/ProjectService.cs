using Backend.Entities;
using Backend.Repositories;

namespace Backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repo;

        public ProjectService(IProjectRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Project>> GetAllAsync() => await _repo.GetAllAsync();

        public async Task<Project?> GetByIdAsync(string id) => await _repo.GetByIdAsync(id);

        public async Task<Project> CreateAsync(Project project) => await _repo.CreateAsync(project);

        public async Task UpdateAsync(Project project) => await _repo.UpdateAsync(project);

        public async Task DeleteAsync(string id) => await _repo.DeleteAsync(id);
    }
}
