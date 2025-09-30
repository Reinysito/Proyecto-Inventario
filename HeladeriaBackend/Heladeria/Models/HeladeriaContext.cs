using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Heladeria.Models;

public partial class HeladeriaContext : DbContext
{
    public HeladeriaContext()
    {
    }

    public HeladeriaContext(DbContextOptions<HeladeriaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ventas> Ventas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=REINY;Database=Heladeria;Trusted_Connection=True;TrustServerCertificate=True;");

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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
