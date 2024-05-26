using BL;
using BO;
using DL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        IBLEmployee _bLEmployee;

        public EmployeeController(IBLEmployee bLEmployee)
        {
            _bLEmployee = bLEmployee;
        }

        [HttpGet]
        [Authorize]
        public ActionResult GetEmployee()
        {
            List<Employee> employee = _bLEmployee.GetEmployee();
            return Ok(employee);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public ActionResult GetEmployee(int id)
        {
            if(id == 0)
            {
                return BadRequest("ID Employee is not valid");
            }
            else
            {
                Employee employee = _bLEmployee.GetEmployeeByID(id);
                return Ok(employee);
            }
        }

        [HttpPut]
        [Authorize]
        public ActionResult UpdateEmployee(Employee employee)
        {
            bool check = _bLEmployee.UpdateEmployee(employee);
            return Ok(new ServiceResult
            {
                Success = check
            });
        }

        [HttpPost]
        [Route("updatePassword")]
        [Authorize]
        public ActionResult UpdatePassword(Password pass)
        {
            int check = _bLEmployee.UpdatePassword(pass);
            if(check == -1)
            {
                return Ok(new ServiceResult
                {
                    Success = false,
                    Message = "Có lỗi không xác định"
                });
            }
            else if(check == 0)
            {
                return Ok(new ServiceResult
                {
                    Success = false,
                    Message = "Mật khẩu cũ không chính xác"
                });
            }
            else
            {
                return Ok(new ServiceResult
                {
                    Success = true,
                    Message = "Đổi mật khẩu thành công"
                });
            }
        }
    }
}
