-- Crear la base de datos 'cafeteria'
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'cafeteria')
BEGIN
    CREATE DATABASE cafeteria;
END
GO

-- Usar la base de datos 'cafeteria'
USE cafeteria;
GO

-- Crear la tabla 'categorias'
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='categorias' AND xtype='U')
BEGIN
    CREATE TABLE categorias (
        id INT NOT NULL PRIMARY KEY,
        nombre NVARCHAR(145) NOT NULL
    );
END
GO

-- Crear la tabla 'ordenes'
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ordenes' AND xtype='U')
BEGIN
    CREATE TABLE ordenes (
        id INT NOT NULL PRIMARY KEY,
        fecha DATE NOT NULL,
        total DECIMAL(8, 2) NOT NULL DEFAULT 0.00
    );
END
GO

-- Crear la tabla 'productos'
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='productos' AND xtype='U')
BEGIN
    CREATE TABLE productos (
        id INT NOT NULL PRIMARY KEY,
        nombre NVARCHAR(145) NOT NULL,
        precio DECIMAL(8, 2) NULL DEFAULT 0.00,
        idCategoria INT NOT NULL,
        FOREIGN KEY (idCategoria) REFERENCES categorias(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
END
GO

-- Crear la tabla 'detalleordenes'
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='detalleordenes' AND xtype='U')
BEGIN
    CREATE TABLE detalleordenes (
        idorden INT NOT NULL,
        idproducto INT NOT NULL,
        cantidad INT NOT NULL,
        precio DECIMAL(8, 2) NOT NULL,
        PRIMARY KEY (idorden, idproducto),
        FOREIGN KEY (idorden) REFERENCES ordenes(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        FOREIGN KEY (idproducto) REFERENCES productos(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
END
GO

