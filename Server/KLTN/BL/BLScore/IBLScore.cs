using BO;

namespace BL
{
    public interface IBLScore : IBLBase
    {
        public Score GetScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID);

        public bool AddScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID, string score);
    }
}
