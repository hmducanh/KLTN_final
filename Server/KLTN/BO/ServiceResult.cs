﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public string Message { get; set; }
        public int? Role { get; set; }
    }
}
