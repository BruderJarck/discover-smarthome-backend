from django.db import models
from django.db.models.base import Model


def upload_path(instance, filename):
    return "/".join(["products", instance.name, filename]) or "/"

class ProductModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    price = models.IntegerField()
    img = models.ImageField(upload_to=upload_path, default="")
    description = models.CharField(max_length=3000000)

class SensorModel(models.Model):
    id: models.AutoField(primary_key=True)
    user_id = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField()

class SensorValueModel(models.Model):
    id: models.AutoField(primary_key=True)
    sensor_id = models.ForeignKey(SensorModel, on_delete=models.CASCADE)
    temp = models.FloatField()
    hum = models.FloatField()
    pres = models.FloatField()
    dt = models.DateTimeField()

