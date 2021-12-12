from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ProductModel, SensorModel, SensorValueModel


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'price', 'img', 'description']

class SensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SensorModel
        fields = ['id', 'user_id', 'location', 'name', 'ip_address']

class SensorValueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SensorValueModel
        fields = ['id', 'sensor_id', 'temp', 'pres', 'hum', 'dt']

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']