from database import SessionLocal, BiosItem
from services.bios_service import BiosResponse
import json

db = SessionLocal()
items = db.query(BiosItem).all()
print(f"Total in db: {len(items)}")
if items:
    # Serialize the first item exactly as FastAPI would
    first = BiosResponse.from_orm(items[0]).dict(by_alias=True)
    print(json.dumps(first))
db.close()
