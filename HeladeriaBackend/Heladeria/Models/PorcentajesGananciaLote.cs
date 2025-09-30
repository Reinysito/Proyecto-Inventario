using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class PorcentajesGananciaLote
{
    public int PorcentajeLoteId { get; set; }

    public int? LoteId { get; set; }

    public int? SocioId { get; set; }

    public decimal? Porcentaje { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Lote? Lote { get; set; }

    public virtual Socio? Socio { get; set; }
}
