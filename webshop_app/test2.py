from models import UserProfile, ProductModel, SensorModel, SensorValueModel
# import models
import datetime
import settings

settings.configure()
new_sensor_value = SensorValueModel.objects.create(1, 80, 80, 80, datetime.datetime.now())