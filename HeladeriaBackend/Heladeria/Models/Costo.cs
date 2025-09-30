using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class Costo
{
    public int CostoId { get; set; }

    public int? LoteId { get; set; }

    public string? Descripcion { get; set; }

    public decimal? Monto { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Lote? Lote { get; set; }
}
