using BO;
using MySqlConnector;

namespace DL
{
    public class DLAuth : DLBase, IDLAuth
    {
        public DLAuth() { }

        public List<Employee> CheckAccountExist(Employee employee)
        {
            string query = $"SELECT * FROM employee WHERE UserName = '{employee.Username}' AND Password = '{employee.Password}'";
            if(!string.IsNullOrEmpty(employee.Email))
            {
                query += $"AND Email = '{employee.Email}'";
            }
            List<Employee> list = GetList<Employee>(query);
            return list;
        }

        public bool AddUser(Employee employee)
        {
            con.Open();
            try
            {
                MySqlCommand comm = con.CreateCommand();
                comm.CommandText = "INSERT INTO employee(username,password, email, role, age) VALUES(@username, @password, @email, @role, @age)";
                comm.Parameters.AddWithValue("@username", employee.Username);
                comm.Parameters.AddWithValue("@password", employee.Password);
                comm.Parameters.AddWithValue("@email", employee.Email);
                comm.Parameters.AddWithValue("@role", employee.Role);
                comm.Parameters.AddWithValue("@age", 0);
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
    }
}
