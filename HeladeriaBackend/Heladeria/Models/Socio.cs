using System;
using System.Collections.Generic;

namespace Heladeria.Models;

public partial class Socio
{
    public int SocioId { get; set; }

    public string? Nombre { get; set; }

    public string? Rol { get; set; }

    public decimal? PorcentajeGanancia { get; set; }

    public virtual ICollection<PorcentajesGananciaLote> PorcentajesGananciaLotes { get; set; } = new List<PorcentajesGananciaLote>();

    public virtual ICollection<TransaccionesCapital> TransaccionesCapitals { get; set; } = new List<TransaccionesCapital>();
}
