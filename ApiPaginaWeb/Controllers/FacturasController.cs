using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ApiPaginaWeb.Models;


namespace ApiPaginaWeb.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FacturasController : ApiController
    {
        private ComprasEntities db = new ComprasEntities();

        // GET: api/Facturas
        public IQueryable<Facturas> GetFacturas()
        {
            return db.Facturas;
        }
      
        // GET: api/Facturas/5
        [ResponseType(typeof(Facturas))]
        public IHttpActionResult GetFacturas(int id)
        {
            Facturas facturas = db.Facturas.Find(id);
            if (facturas == null)
            {
                return NotFound();
            }

            return Ok(facturas);
        }

        // PUT: api/Facturas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFacturas(int id, Facturas facturas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != facturas.id)
            {
                return BadRequest();
            }

            db.Entry(facturas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Facturas
        [ResponseType(typeof(Facturas))]
        public IHttpActionResult PostFacturas(Facturas facturas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Facturas.Add(facturas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = facturas.id }, facturas);
        }

        // DELETE: api/Facturas/5
        [ResponseType(typeof(Facturas))]
        public IHttpActionResult DeleteFacturas(int id)
        {
            Facturas facturas = db.Facturas.Find(id);
            if (facturas == null)
            {
                return NotFound();
            }

            db.Facturas.Remove(facturas);
            db.SaveChanges();

            return Ok(facturas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FacturasExists(int id)
        {
            return db.Facturas.Count(e => e.id == id) > 0;
        }
    }
}