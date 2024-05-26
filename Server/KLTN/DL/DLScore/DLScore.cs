using BO;
using DL;
using MySqlConnector;
using static System.Formats.Asn1.AsnWriter;

namespace DL
{
    public class DLScore : DLBase, IDLScore
    {
        public DLScore() { }

        public bool AddScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID, string score)
        {
            Score _score = GetScoreResult(employeeID, educationalFacilityID, criterionMappingID);
            if(_score != null)
            {
                // update
                con.Open();
                try
                {
                    MySqlCommand comm = con.CreateCommand();
                    comm.CommandText = "UPDATE score SET Result = @score WHERE EmployeeID = @employeeID AND EducationalFacilityID = @educationalFacilityID AND CriterionMappingID = @criterionMappingID";
                    comm.Parameters.AddWithValue("@score", score);
                    comm.Parameters.AddWithValue("@employeeID", employeeID);
                    comm.Parameters.AddWithValue("@educationalFacilityID", educationalFacilityID);
                    comm.Parameters.AddWithValue("@criterionMappingID", criterionMappingID);
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
            else
            {
                // thêm mới
                con.Open();
                try
                {
                    MySqlCommand comm = con.CreateCommand();
                    comm.CommandText = "INSERT INTO score(EmployeeID, EducationalFacilityID, CriterionMappingID, Result) VALUES(@employeeID, @educationalFacilityID, @criterionMappingID, @score)";
                    comm.Parameters.AddWithValue("@employeeID", employeeID);
                    comm.Parameters.AddWithValue("@educationalFacilityID", educationalFacilityID);
                    comm.Parameters.AddWithValue("@criterionMappingID", criterionMappingID);
                    comm.Parameters.AddWithValue("@score", score);
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

        public Score GetScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID)
        {
            string query = $"SELECT * FROM score WHERE EmployeeID = {employeeID} AND EducationalFacilityID = {educationalFacilityID} AND CriterionMappingID = {criterionMappingID}";
            List<Score> scores = GetList<Score>(query);
            return scores.Count == 0 ? null : scores[0];
        }

        public List<ScoreResult> GetScoreResultOfSchool(int educationalFacilityID, int criterionMappingID)
        {
            string query = $"SELECT s.*, e.Fullname FROM score s JOIN employee e ON s.EmployeeID = e.ID where s.EducationalFacilityID = {educationalFacilityID} AND s.CriterionMappingID = {criterionMappingID}";
            List<ScoreResult> scores = GetList<ScoreResult>(query);
            return scores.Count == 0 ? null : scores;
        }
    }
}
