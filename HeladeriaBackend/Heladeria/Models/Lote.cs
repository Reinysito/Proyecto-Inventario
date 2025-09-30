using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class Lote
{
    public int LoteId { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public int? CantidadHelados { get; set; }

    public decimal? CapitalInicial { get; set; }

    public decimal? CostoTotalLote { get; set; }

    public decimal? PrecioVentaUnitario { get; set; }

    public decimal? VentasTotales { get; set; }

    public int? HeladosVendidos { get; set; }

    public string? EstadoLote { get; set; }

    public virtual ICollection<Costo> Costos { get; set; } = new List<Costo>();

    public virtual ICollection<PorcentajesGananciaLote> PorcentajesGananciaLotes { get; set; } = new List<PorcentajesGananciaLote>();

    public virtual ICollection<TransaccionesCapital> TransaccionesCapitals { get; set; } = new List<TransaccionesCapital>();
}
