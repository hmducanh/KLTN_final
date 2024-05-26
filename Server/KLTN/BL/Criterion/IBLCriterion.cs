using BO;

namespace BL
{
    public interface IBLCriterion : IBLBase
    {
        public List<CriterionMapping> GetAllCriterionMapping();
    }
}
