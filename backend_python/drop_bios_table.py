from database import engine, BiosItem, Base
from sqlalchemy import text
import sys

# Drop force and recreate
try:
    if engine.dialect.name == "postgresql":
        with engine.connect() as con:
            con.execute(text("DROP TABLE IF EXISTS bios_items CASCADE"))
            con.commit()
    else:
        Base.metadata.drop_all(bind=engine, tables=[BiosItem.__table__])
        
    Base.metadata.create_all(bind=engine, tables=[BiosItem.__table__])
    print("Sucesso: Tabela bios_items droppada e recriada com a nova Primary Key!")
except Exception as e:
    print(f"Erro ao droppar/recriar a tabela: {e}")
    sys.exit(1)
