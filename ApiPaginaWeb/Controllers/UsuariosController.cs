using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ApiPaginaWeb.Models;
using System.Web.Http.Cors;


namespace ApiPaginaWeb.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UsuariosController : ApiController
    {

        private ComprasEntities db = new ComprasEntities();


        // GET: api/Usuarios
        public IQueryable<Usuarios> GetUsuarios()
        {
            return db.Usuarios;
        }
        //
        [HttpPost]
        public Reply Login([FromBody] AccessViewModel model)
        {
            Reply oR = new Reply();
            oR.result = 0;
            try
            {
                using (ComprasEntities db = new ComprasEntities())
                {
                    var lst = db.Usuarios.Where(d=>d.nombre == model.usuario && d.password == model.password);
                    if (lst.Count()>0)
                    {
                        oR.result = 1;
                        oR.data = Guid.NewGuid().ToString();
                        Usuarios oUsuario = lst.First();
                        oUsuario.token = oR.data.ToString();
                        db.Entry(oUsuario).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }
                    else
                    {
                        oR.message = "Datos erroneos";
                    }
                }
            }
            catch (Exception ex)
            {

                oR.message = "Ocurrio un error, estamos corrigiendolo";

            }
            return oR;
        }
        

        // GET: api/Usuarios/5
        [ResponseType(typeof(Usuarios))]
        public IHttpActionResult GetUsuarios(int id)
        {
            Usuarios usuarios = db.Usuarios.Find(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            return Ok(usuarios);
        }
       

        // PUT: api/Usuarios/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUsuarios(int id, Usuarios usuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usuarios.id)
            {
                return BadRequest();
            }

            db.Entry(usuarios).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(id))
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

        // POST: api/Usuarios
       /* [ResponseType(typeof(Usuarios))]
        public IHttpActionResult PostUsuarios(Usuarios usuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Usuarios.Add(usuarios);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = usuarios.id }, usuarios);
        }*/

        // DELETE: api/Usuarios/5
        [ResponseType(typeof(Usuarios))]
        public IHttpActionResult DeleteUsuarios(int id)
        {
            Usuarios usuarios = db.Usuarios.Find(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            db.Usuarios.Remove(usuarios);
            db.SaveChanges();

            return Ok(usuarios);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsuariosExists(int id)
        {
            return db.Usuarios.Count(e => e.id == id) > 0;
        }
    }
}