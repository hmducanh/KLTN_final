using BL;
using BO;
using DL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace KLTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CriterionController : ControllerBase
    {
        IBLCriterion _bLCriterion;

        public CriterionController(IBLCriterion bLCriterion)
        {
            _bLCriterion = bLCriterion;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllCriterionMapping()
        {
            try
            {
                List<CriterionMapping> data = _bLCriterion.GetAllCriterionMapping();
                return Ok(new ServiceResult
                {
                    Success = true,
                    Data = data
                });
            }
            catch(Exception ex) {
                return Ok(new ServiceResult
                {
                    Success = false,
                    Message = "Đã có lỗi xảy ra"
                });
            }
        }
    }
}
