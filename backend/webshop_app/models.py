from django.db import models


def upload_path(instance, filename):
    return "/".join(["products", instance.name, filename]) or "/"

class ProductModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    price = models.IntegerField()
    img = models.ImageField(upload_to=upload_path, default="")
    description = models.CharField(max_length=3000000)
