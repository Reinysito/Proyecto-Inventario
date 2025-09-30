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
    public class CostosController : ControllerBase
    {
        private readonly MiApiDbContext _context;

        public CostosController(MiApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Costos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Costo>>> GetCostos()
        {
            return await _context.Costos.ToListAsync();
        }

        // GET: api/Costos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Costo>> GetCosto(int id)
        {
            var costo = await _context.Costos.FindAsync(id);

            if (costo == null)
            {
                return NotFound();
            }

            return costo;
        }

        // PUT: api/Costos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCosto(int id, Costo costo)
        {
            if (id != costo.CostoId)
            {
                return BadRequest();
            }

            _context.Entry(costo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CostoExists(id))
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

        // POST: api/Costos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Costo>> PostCosto(Costo costo)
        {
            _context.Costos.Add(costo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCosto", new { id = costo.CostoId }, costo);
        }

        // DELETE: api/Costos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCosto(int id)
        {
            var costo = await _context.Costos.FindAsync(id);
            if (costo == null)
            {
                return NotFound();
            }

            _context.Costos.Remove(costo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CostoExists(int id)
        {
            return _context.Costos.Any(e => e.CostoId == id);
        }
    }
}
