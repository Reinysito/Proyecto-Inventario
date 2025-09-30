using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class Ventas
{
    public int VentaId { get; set; }

    public int LoteId { get; set; }

    public DateTime FechaVenta { get; set; }

    public int CantidadHelados { get; set; }

    public decimal PrecioUnitario { get; set; }

    public decimal? TotalVenta { get; set; }
}
