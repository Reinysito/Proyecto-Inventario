using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Heladeria.Models;

namespace Heladeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorcentajesGananciaLoteController : ControllerBase
    {
        private readonly MiApiDbContext _context;

        public PorcentajesGananciaLoteController(MiApiDbContext context)
        {
            _context = context;
        }

        // GET: api/PorcentajesGananciaLote
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PorcentajesGananciaLote>>> GetPorcentajesGananciaLotes()
        {
            return await _context.PorcentajesGananciaLotes.ToListAsync();
        }

        // GET: api/PorcentajesGananciaLote/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PorcentajesGananciaLote>> GetPorcentajesGananciaLote(int id)
        {
            var porcentajesGananciaLote = await _context.PorcentajesGananciaLotes.FindAsync(id);

            if (porcentajesGananciaLote == null)
            {
                return NotFound();
            }

            return porcentajesGananciaLote;
        }

        // PUT: api/PorcentajesGananciaLote/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPorcentajesGananciaLote(int id, PorcentajesGananciaLote porcentajesGananciaLote)
        {
            if (id != porcentajesGananciaLote.PorcentajeLoteId)
            {
                return BadRequest();
            }

            _context.Entry(porcentajesGananciaLote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PorcentajesGananciaLoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PorcentajesGananciaLote
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PorcentajesGananciaLote>> PostPorcentajesGananciaLote(PorcentajesGananciaLote porcentajesGananciaLote)
        {
            _context.PorcentajesGananciaLotes.Add(porcentajesGananciaLote);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PorcentajesGananciaLoteExists(porcentajesGananciaLote.PorcentajeLoteId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPorcentajesGananciaLote", new { id = porcentajesGananciaLote.PorcentajeLoteId }, porcentajesGananciaLote);
        }

        // DELETE: api/PorcentajesGananciaLote/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePorcentajesGananciaLote(int id)
        {
            var porcentajesGananciaLote = await _context.PorcentajesGananciaLotes.FindAsync(id);
            if (porcentajesGananciaLote == null)
            {
                return NotFound();
            }

            _context.PorcentajesGananciaLotes.Remove(porcentajesGananciaLote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PorcentajesGananciaLoteExists(int id)
        {
            return _context.PorcentajesGananciaLotes.Any(e => e.PorcentajeLoteId == id);
        }
    }
}
