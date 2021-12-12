from sqlalchemy import create_engine
from sqlalchemy.sql.expression import column

db_string = "sqlite://dosqjosb:HB9JBPLqY6G5M8Tn_mHrbFyq7r6bxk0y@hattie.db.elephantsql.com/dosqjosb"

db = create_engine(db_string)

result_set = db.execute(f"SELECT * FROM Products").all()

print(result_set)