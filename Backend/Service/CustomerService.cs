using Backend.Entities;
using Backend.Repositories;

namespace Backend.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repo;

        public CustomerService(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Customer>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Customer?> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<Customer> CreateAsync(Customer customer) => await _repo.CreateAsync(customer);
        public async Task UpdateAsync(Customer customer) => await _repo.UpdateAsync(customer);
        public async Task DeleteAsync(int id) => await _repo.DeleteAsync(id);
    }
}
