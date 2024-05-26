using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class ScoreResult
    {
        public int EmployeeID { get; set; }
        public int EducationalFacilityID { get; set; }
        public int CriterionMappingID { get; set; }
        public string Result { get; set; }
        public string FullName { get; set; }
    }
}
