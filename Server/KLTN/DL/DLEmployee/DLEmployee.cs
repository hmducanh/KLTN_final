using BO;
using System.Data.Common;
using System.Data;
using MySqlConnector;

namespace DL
{
    public class DLEmployee : DLBase, IDLEmployee
    {
        public DLEmployee()
        {

        }
        public List<Employee> GetEmployee()
        {
            string query = "SELECT * FROM employee";
            return GetList<Employee>(query);
        }

        public Employee GetEmployeeByID(int id)
        {
            string query = $"SELECT * FROM employee WHERE ID={id}";
            return GetList<Employee>(query)[0];
        }

        public bool UpdateEmployee(Employee employee)
        {
            con.Open();
            try
            {
                MySqlCommand comm = con.CreateCommand();
                comm.CommandText = "UPDATE employee SET Fullname = @fullname, Email = @email, Address = @address, Age = @age WHERE ID = @ID";
                comm.Parameters.AddWithValue("@fullname", employee.FullName);
                comm.Parameters.AddWithValue("@email", employee.Email);
                comm.Parameters.AddWithValue("@address", employee.Address);
                comm.Parameters.AddWithValue("@age", employee.Age);
                comm.Parameters.AddWithValue("@ID", employee.ID);
                comm.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch
            {
                con.Close();
                return false;
            }
        }

        public int UpdatePassword(Password pass)
        {
            con.Open();
            try
            {
                MySqlCommand comm = con.CreateCommand();
                comm.CommandText = "UPDATE employee SET Password = @newPass where Password = @oldPass;";
                comm.Parameters.AddWithValue("@newPass", pass.newPass);
                comm.Parameters.AddWithValue("@oldPass", pass.oldPass);
                int check = comm.ExecuteNonQuery();
                con.Close();
                return check;
            }
            catch
            {
                con.Close();
                return -1;
            }
        }
    }
}
