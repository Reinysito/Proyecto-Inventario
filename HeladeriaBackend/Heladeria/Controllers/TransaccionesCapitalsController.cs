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
    public class TransaccionesCapitalsController : ControllerBase
    {
        private readonly MiApiDbContext _context;

        public TransaccionesCapitalsController(MiApiDbContext context)
        {
            _context = context;
        }

        // GET: api/TransaccionesCapitals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransaccionesCapital>>> GetTransaccionesCapitals()
        {
            return await _context.TransaccionesCapitals.ToListAsync();
        }

        // GET: api/TransaccionesCapitals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransaccionesCapital>> GetTransaccionesCapital(int id)
        {
            var transaccionesCapital = await _context.TransaccionesCapitals.FindAsync(id);

            if (transaccionesCapital == null)
            {
                return NotFound();
            }

            return transaccionesCapital;
        }

        // PUT: api/TransaccionesCapitals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaccionesCapital(int id, TransaccionesCapital transaccionesCapital)
        {
            if (id != transaccionesCapital.TransaccionId)
            {
                return BadRequest();
            }

            _context.Entry(transaccionesCapital).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransaccionesCapitalExists(id))
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

        // POST: api/TransaccionesCapitals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TransaccionesCapital>> PostTransaccionesCapital(TransaccionesCapital transaccionesCapital)
        {
            _context.TransaccionesCapitals.Add(transaccionesCapital);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaccionesCapital", new { id = transaccionesCapital.TransaccionId }, transaccionesCapital);
        }

        // DELETE: api/TransaccionesCapitals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaccionesCapital(int id)
        {
            var transaccionesCapital = await _context.TransaccionesCapitals.FindAsync(id);
            if (transaccionesCapital == null)
            {
                return NotFound();
            }

            _context.TransaccionesCapitals.Remove(transaccionesCapital);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransaccionesCapitalExists(int id)
        {
            return _context.TransaccionesCapitals.Any(e => e.TransaccionId == id);
        }
    }
}
