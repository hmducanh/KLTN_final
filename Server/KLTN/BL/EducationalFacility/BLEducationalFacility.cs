using BO;
using DL;
using DL.DLEducationalFacility;

namespace BL
{
    public class BLEducationalFacility : BLBase, IBLEducationalFacility
    {
        private IDLEducationalFacility _dLEducationalFacility;

        public BLEducationalFacility(IDLEducationalFacility dLEducationalFacility)
        {
            _dLEducationalFacility = dLEducationalFacility;
        }

        public List<EducationalFacility> GetEducationalFacility()
        {
            return _dLEducationalFacility.GetEducationalFacility();
        }
    }
}
