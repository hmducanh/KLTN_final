using BO;
using DL;

namespace BL
{
    public class BLScore : BLBase, IBLScore
    {
        private IDLScore _dLScore;

        public BLScore(IDLScore dLScore)
        {
            _dLScore = dLScore;
        }
        public Score GetScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID)
        {
            return _dLScore.GetScoreResult(employeeID, educationalFacilityID, criterionMappingID);
        }

        public bool AddScoreResult(int employeeID, int educationalFacilityID, int criterionMappingID, string score)
        {
            return _dLScore.AddScoreResult(employeeID, educationalFacilityID, criterionMappingID, score);
        }

    }
}
