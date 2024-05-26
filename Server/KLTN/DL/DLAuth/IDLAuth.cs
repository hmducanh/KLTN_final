using BO;

namespace DL
{
    public interface IDLAuth : IDLBase
    {
        public List<Employee> CheckAccountExist(Employee employee);

        public bool AddUser(Employee employee);
    }
}
