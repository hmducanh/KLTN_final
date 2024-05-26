using BO;

namespace DL.DLEducationalFacility
{
    public class DLEducationalFacility : DLBase, IDLEducationalFacility
    {
        public DLEducationalFacility() { }

        public List<EducationalFacility> GetEducationalFacility()
        {
            string query = "SELECT * FROM educational_facility";
            List<EducationalFacility> list = GetList<EducationalFacility>(query);
            return list;
        }
    }
}
