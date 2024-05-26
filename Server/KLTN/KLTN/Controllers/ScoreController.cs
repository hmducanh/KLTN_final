using BL;
using BO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        IBLScore _bLScore;

        public ScoreController(IBLScore bLScore)
        {
            _bLScore = bLScore;
        }

        [HttpGet]
        [Route("{employeeID:int}/{educationalFacilityID:int}/{criterionMappingID:int}")]
        [Authorize]
        public ActionResult GetScore(int employeeID, int educationalFacilityID, int criterionMappingID)
        {
            Score score = _bLScore.GetScoreResult(employeeID, educationalFacilityID, criterionMappingID);
            return Ok(new ServiceResult
            {
                Success = true,
                Data = score?.Result
            });
        }

        [HttpPost]
        [Authorize]
        public ActionResult AddScore(Score score)
        {
            bool result = _bLScore.AddScoreResult(score.EmployeeID, score.EducationalFacilityID, score.CriterionMappingID, score.Result);
            return Ok(new ServiceResult
            {
                Success = result
            });
        }

        [HttpGet]
        [Route("{educationalFacilityID:int}/{criterionMappingID:int}")]
        [Authorize]
        public ActionResult GetScoreResultOfSchool(int educationalFacilityID, int criterionMappingID)
        {
            List<ScoreResult> score = _bLScore.GetScoreResultOfSchool(educationalFacilityID, criterionMappingID);
            return Ok(new ServiceResult
            {
                Success = true,
                Data = score
            });
        }
    }
}
