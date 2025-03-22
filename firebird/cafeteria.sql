-- -----------------------------------------------------
-- Schema cafeteria
-- -----------------------------------------------------
-- Firebird no utiliza `CREATE SCHEMA`. Los objetos de base de datos
-- se crean directamente en la base de datos actual, por lo que no es necesario.
-- Asumimos que la base de datos llamada "cafeteria" ya está creada.

SET TERM ^ ;
-- -----------------------------------------------------
-- Table `cafeteria`.`categorias`
-- -----------------------------------------------------
CREATE TABLE categorias (
  id INT NOT NULL,
  nombre VARCHAR(145) NOT NULL,
  CONSTRAINT PK_Categorias PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table `cafeteria`.`ordenes`
-- -----------------------------------------------------
CREATE TABLE ordenes (
  id INT NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT PK_Ordenes PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table `cafeteria`.`productos`
-- -----------------------------------------------------
CREATE TABLE productos (
  id INT NOT NULL,
  nombre VARCHAR(145) NOT NULL,
  precio DECIMAL(8,2) DEFAULT 0.00,
  idCategoria INT NOT NULL,
  CONSTRAINT PK_Productos PRIMARY KEY (id),
  CONSTRAINT FK_Categoria FOREIGN KEY (idCategoria)
    REFERENCES categorias (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `cafeteria`.`detalleordenes`
-- -----------------------------------------------------
CREATE TABLE detalleordenes (
  idorden INT NOT NULL,
  idproducto INT NOT NULL,
  cantidad INT NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  CONSTRAINT PK_DetalleOrdenes PRIMARY KEY (idorden, idproducto),
  CONSTRAINT FK_Ordenes FOREIGN KEY (idorden)
    REFERENCES ordenes (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_Productos FOREIGN KEY (idproducto)
    REFERENCES productos (id) ON DELETE CASCADE ON UPDATE CASCADE
);

SET TERM ; ^
