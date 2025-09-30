using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class TransaccionesCapital
{
    public int TransaccionId { get; set; }

    public int? LoteId { get; set; }

    public int? SocioId { get; set; }

    public decimal? Monto { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Lote? Lote { get; set; }

    public virtual Socio? Socio { get; set; }
}
