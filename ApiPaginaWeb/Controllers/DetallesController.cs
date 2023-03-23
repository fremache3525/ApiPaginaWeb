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
    public class DetallesController : ApiController
    {
        private ComprasEntities db = new ComprasEntities();

        // GET: api/Detalles
        public IQueryable<Detalles> GetDetalles()
        {
            return db.Detalles;
        }

        // GET: api/Detalles/5
        [ResponseType(typeof(Detalles))]
        public IHttpActionResult GetDetalles(int id)
        {
            Detalles detalles = db.Detalles.Find(id);
            if (detalles == null)
            {
                return NotFound();
            }

            return Ok(detalles);
        }

        // GET: api/DeatallesCompras/5
        [HttpGet]
        [Route("api/DeatallesCompras/{id}")]
        public IQueryable<Detalles> ObtenerDeatallesCompras(int id)
        {
            return db.Detalles.Where(x=>x.id_factura==id);
        }

        // PUT: api/Detalles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetalles(int id, Detalles detalles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detalles.id)
            {
                return BadRequest();
            }

            db.Entry(detalles).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetallesExists(id))
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

        // POST: api/Detalles
        [ResponseType(typeof(Detalles))]
        public IHttpActionResult PostDetalles(Detalles detalles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Detalles.Add(detalles);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = detalles.id }, detalles);
        }

        // DELETE: api/Detalles/5
        [ResponseType(typeof(Detalles))]
        public IHttpActionResult DeleteDetalles(int id)
        {
            Detalles detalles = db.Detalles.Find(id);
            if (detalles == null)
            {
                return NotFound();
            }

            db.Detalles.Remove(detalles);
            db.SaveChanges();

            return Ok(detalles);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DetallesExists(int id)
        {
            return db.Detalles.Count(e => e.id == id) > 0;
        }
    }
}