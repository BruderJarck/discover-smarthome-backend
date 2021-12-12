from sqlalchemy import create_engine
from sqlalchemy.sql.expression import column

db_string = "postgresql://dosqjosb:HB9JBPLqY6G5M8Tn_mHrbFyq7r6bxk0y@hattie.db.elephantsql.com/dosqjosb"

db = create_engine(db_string)

user_id = 1
res = {}

sensor_result_set = db.execute(f"SELECT * FROM sensor where user_id={user_id}").all()
print(sensor_result_set)

sensor_ids = [x[0] for x in sensor_result_set]
print(sensor_ids)

for sensor_id in sensor_ids:
    sensor_data_result_set = db.execute(f"SELECT * FROM sensor_data where sensor_id={sensor_id}").all()

    dt = []
    temp = []
    hum = []
    pres = []

    for x in sensor_data_result_set:
        temp.append(x[0])
        hum.append(x[1])
        pres.append(x[2])
        dt.append(x[3])

    sensor = {
        "temp": temp,
        "hum": hum,
        "pres": pres,
        "dt": dt,
        "sensor": list(sensor_result_set[sensor_id-1])
        }
    
    res[f'{sensor_id}'] = sensor

print(res)
