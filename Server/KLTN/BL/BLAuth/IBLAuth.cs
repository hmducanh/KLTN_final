using BO;

namespace BL
{
    public interface IBLAuth : IBLBase
    {
        public List<Employee> CheckAccountExist(Employee employee);

        public bool AddUser(Employee employee);
    }
}
