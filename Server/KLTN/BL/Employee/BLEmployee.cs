using BO;
using DL;
using Helper;

namespace BL
{
    public class BLEmployee : BLBase, IBLEmployee
    {
        private IDLEmployee _dlEmployee;

        public BLEmployee(IDLEmployee dlEmployee)
        {
            _dlEmployee = dlEmployee;
        }

        public List<Employee> GetEmployee()
        {
            return _dlEmployee.GetEmployee();
        }

        public Employee GetEmployeeByID(int id)
        {
            return _dlEmployee.GetEmployeeByID(id);
        }

        public bool UpdateEmployee(Employee employee)
        {
            return _dlEmployee.UpdateEmployee(employee);
        }

        public int UpdatePassword(Password pass)
        {
            pass.oldPass = Common.ToMD5(pass.oldPass);
            pass.newPass = Common.ToMD5(pass.newPass);
            return _dlEmployee.UpdatePassword(pass);
        }
    }
}
