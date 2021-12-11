from django.contrib import admin
from .models import ProductModel, SensorModel, SensorValueModel

admin.site.register(ProductModel)
admin.site.register(SensorModel)
admin.site.register(SensorValueModel)
