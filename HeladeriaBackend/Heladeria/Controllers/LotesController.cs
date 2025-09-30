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
    public class LotesController : ControllerBase
    {
        private readonly MiApiDbContext _context;

        public LotesController(MiApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Lotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lote>>> GetLotes()
        {
            return await _context.Lotes.ToListAsync();
        }

        // GET: api/Lotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lote>> GetLote(int id)
        {
            var lote = await _context.Lotes.FindAsync(id);

            if (lote == null)
            {
                return NotFound();
            }

            return lote;
        }


        public class VentaDto
        {
            public int LoteId { get; set; }
            public int Cantidad { get; set; }
            public decimal Monto { get; set; }
        }

        [HttpPut("RegistrarVenta")]
        public IActionResult RegistrarVenta([FromBody] VentaDto venta)
        {
            var lote = _context.Lotes.Find(venta.LoteId);
            if (lote == null) return NotFound();

            lote.HeladosVendidos += venta.Cantidad;
            lote.VentasTotales += venta.Monto;

            _context.SaveChanges();
            return Ok(lote);
        }

        // PUT: api/Lotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLote(int id, Lote lote)
        {
            if (id != lote.LoteId)
            {
                return BadRequest();
            }

            _context.Entry(lote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoteExists(id))
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

        // POST: api/Lotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lote>> PostLote(Lote lote)
        {
            _context.Lotes.Add(lote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLote", new { id = lote.LoteId }, lote);
        }

        // DELETE: api/Lotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLote(int id)
        {
            var lote = await _context.Lotes.FindAsync(id);
            if (lote == null)
            {
                return NotFound();
            }

            _context.Lotes.Remove(lote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoteExists(int id)
        {
            return _context.Lotes.Any(e => e.LoteId == id);
        }
    }
}
