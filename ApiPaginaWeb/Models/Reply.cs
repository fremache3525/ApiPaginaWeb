using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiPaginaWeb.Models
{
    public class Reply
    {
        public int result { get; set; }
        public object token { get; set; }
        public string message { get; set; }
    }
}