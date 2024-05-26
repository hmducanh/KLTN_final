using BO;

namespace DL
{
    public class DLCriterion : DLBase, IDLCriterion
    {
        public DLCriterion() { }

        public List<CriterionMapping> GetAllCriterionMapping()
        {
            string query = "SELECT * FROM criterion_mapping";
            List<CriterionMapping> list = GetList<CriterionMapping>(query);
            return list;
        }
    }
}
