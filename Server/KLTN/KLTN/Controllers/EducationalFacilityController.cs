using BL;
using BO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationalFacilityController : ControllerBase
    {
        IBLEducationalFacility _bLEducationalFacility;

        public EducationalFacilityController(IBLEducationalFacility bLEducationalFacility)
        {
            _bLEducationalFacility = bLEducationalFacility;
        }

        [HttpGet]
        public ActionResult GetEducationalFacility()
        {
            List<EducationalFacility> data = _bLEducationalFacility.GetEducationalFacility();
            return Ok(data);
        }
    }
}
