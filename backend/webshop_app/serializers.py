from rest_framework import serializers
from .models import ProductModel


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'price', 'img', 'description']
