from database import engine

try:
    with engine.connect() as conn:
        print("CONNECTED SUCCESSFULLY!")
except Exception as e:
    print("ERROR:", e)