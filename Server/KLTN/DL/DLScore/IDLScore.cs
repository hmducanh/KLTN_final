using BO;

namespace DL
{
    public interface IDLScore : IDLBase
    {
        public Score GetScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID);

        public bool AddScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID, string score);

        public List<ScoreResult> GetScoreResultOfSchool(int educationalFacilityID, int criterionMappingID);
    }
}
