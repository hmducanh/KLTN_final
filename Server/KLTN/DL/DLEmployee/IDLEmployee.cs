using BO;

namespace DL
{
    public interface IDLEmployee : IDLBase
    {
        public List<Employee> GetEmployee();

        public Employee GetEmployeeByID(int id);

        public bool UpdateEmployee(Employee employee);

        public int UpdatePassword(Password pass);
    }
}
