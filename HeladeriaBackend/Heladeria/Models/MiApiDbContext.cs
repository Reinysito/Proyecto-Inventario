using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Heladeria.Models;

namespace Heladeria.Models;

public partial class MiApiDbContext : DbContext
{
    public MiApiDbContext()
    {
    }

    public MiApiDbContext(DbContextOptions<MiApiDbContext> options)
        : base(options)
    {
    }
    public virtual DbSet<Ventas> Ventas { get; set; }

    public virtual DbSet<Costo> Costos { get; set; }

    public virtual DbSet<Lote> Lotes { get; set; }

    public virtual DbSet<PorcentajesGananciaLote> PorcentajesGananciaLotes { get; set; }

    public virtual DbSet<Socio> Socios { get; set; }

    public virtual DbSet<TransaccionesCapital> TransaccionesCapitals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=REINY;Database=Heladeria;Trusted_Connection=True;MultipleActiveResultSets=True;App=EntityFramework;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ventas>(entity =>
        {
            entity.HasKey(e => e.VentaId).HasName("PK__Ventas__5B4150AC9B4CB61E");

            entity.Property(e => e.FechaVenta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PrecioUnitario).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.TotalVenta)
                .HasComputedColumnSql("([CantidadHelados]*[PrecioUnitario])", true)
                .HasColumnType("decimal(21, 2)");
        });

        modelBuilder.Entity<Costo>(entity =>
        {
            entity.HasKey(e => e.CostoId).HasName("PK__Costos__501474F5F8612517");

            entity.Property(e => e.CostoId).HasColumnName("CostoID");
            entity.Property(e => e.Descripcion).HasMaxLength(200);
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Lote).WithMany(p => p.Costos)
                .HasForeignKey(d => d.LoteId)
                .HasConstraintName("FK__Costos__LoteID__145C0A3F");
        });

        modelBuilder.Entity<Lote>(entity =>
        {
            entity.HasKey(e => e.LoteId).HasName("PK__Lotes__E6EAE6F83BA3DBD2");

            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.CapitalInicial).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CostoTotalLote).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Descripcion).HasMaxLength(30);
            entity.Property(e => e.EstadoLote).HasMaxLength(50);
            entity.Property(e => e.FechaCreacion).HasColumnType("datetime");
            entity.Property(e => e.PrecioVentaUnitario).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.VentasTotales).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<PorcentajesGananciaLote>(entity =>
        {
            entity.HasKey(e => e.PorcentajeLoteId).HasName("PK__Porcenta__2B0A7FC2BE6A4616");

            entity.ToTable("PorcentajesGananciaLote");

            entity.Property(e => e.PorcentajeLoteId)
                .ValueGeneratedNever()
                .HasColumnName("PorcentajeLoteID");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.Porcentaje).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.SocioId).HasColumnName("SocioID");

            entity.HasOne(d => d.Lote).WithMany(p => p.PorcentajesGananciaLotes)
                .HasForeignKey(d => d.LoteId)
                .HasConstraintName("FK__Porcentaj__LoteI__1B0907CE");

            entity.HasOne(d => d.Socio).WithMany(p => p.PorcentajesGananciaLotes)
                .HasForeignKey(d => d.SocioId)
                .HasConstraintName("FK__Porcentaj__Socio__1BFD2C07");
        });

        modelBuilder.Entity<Socio>(entity =>
        {
            entity.HasKey(e => e.SocioId).HasName("PK__Socios__165D08DAB7A531CE");

            entity.Property(e => e.SocioId).HasColumnName("SocioID");
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.PorcentajeGanancia).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Rol).HasMaxLength(30);
        });

        modelBuilder.Entity<TransaccionesCapital>(entity =>
        {
            entity.HasKey(e => e.TransaccionId).HasName("PK__Transacc__86A849DE7984CFD2");

            entity.ToTable("TransaccionesCapital");

            entity.Property(e => e.TransaccionId).HasColumnName("TransaccionID");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.SocioId).HasColumnName("SocioID");

            entity.HasOne(d => d.Lote).WithMany(p => p.TransaccionesCapitals)
                .HasForeignKey(d => d.LoteId)
                .HasConstraintName("FK__Transacci__LoteI__173876EA");

            entity.HasOne(d => d.Socio).WithMany(p => p.TransaccionesCapitals)
                .HasForeignKey(d => d.SocioId)
                .HasConstraintName("FK__Transacci__Socio__182C9B23");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

public DbSet<Heladeria.Models.Ventas> Venta { get; set; } = default!;
}
