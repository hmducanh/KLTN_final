using BO;
using DL;

namespace BL
{
    public class BLCriterion : BLBase, IBLCriterion
    {
        private IDLCriterion _dLCriterion;

        public BLCriterion(IDLCriterion dLCriterion)
        {
            _dLCriterion = dLCriterion;
        }

        public List<CriterionMapping> GetAllCriterionMapping() 
        {
            return _dLCriterion.GetAllCriterionMapping();
        }
    }
}
