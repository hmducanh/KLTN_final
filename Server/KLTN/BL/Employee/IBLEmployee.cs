using BO;

namespace BL
{
    public interface IBLEmployee : IBLBase
    {
        public List<Employee> GetEmployee();
        public Employee GetEmployeeByID(int id);
        public bool UpdateEmployee(Employee employee);
        public int UpdatePassword(Password pass);
    }
}
