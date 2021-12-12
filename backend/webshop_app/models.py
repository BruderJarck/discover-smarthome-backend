from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User


def upload_path(instance, filename):
    return "/".join(["products", instance.name, filename]) or "/"

class ProductModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    price = models.IntegerField()
    img = models.ImageField(upload_to=upload_path, default="")
    description = models.CharField(max_length=3000000)

    def __str__(self) -> str:
        return f"{self.name}"

class SensorModel(models.Model):
    id =  models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField()

    def __str__(self) -> str:
        return f"{self.name} belonging to {self.user_id}, located in {self.location}"

class SensorValueModel(models.Model):
    id = models.AutoField(primary_key=True)
    sensor = models.ForeignKey(SensorModel, on_delete=models.CASCADE, null=True)
    temp = models.FloatField()
    hum = models.FloatField()
    pres = models.FloatField()
    dt = models.DateTimeField()

    def __str__(self) -> str:
        return f"{self.id} belonging to {self.sensor_id}, at {self.dt}"
