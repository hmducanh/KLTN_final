using BO;

namespace DL
{
    public interface IDLCriterion : IDLBase
    {
        public List<CriterionMapping> GetAllCriterionMapping();
    }
}
