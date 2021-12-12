import json
from django.http import response
from django.http.response import JsonResponse
from rest_framework.response import Response
from sqlalchemy import create_engine

from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from sqlalchemy.sql.functions import user
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView



from .serializers import ProductSerializer, SensorSerializer, SensorValueSerializer, CustomUserSerializer
from .models import ProductModel, SensorModel, SensorValueModel


class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer    
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        img = request.data['img']
        print(name, img)
        ProductModel.objects.create(title=name, img=img)
        return HttpResponse({'message': 'Product created'}, status=200)

    def put(self, request, *args, **kwargs):
        id = request.data['id']
        new_name = request.data['name']

        prod = ProductModel.objects.get(pk=id)

        if prod.name != new_name:
            prod.name = new_name

        prod.save()

        return HttpResponse({'message': 'Product property changed'})

    def delete(self, request):
        id = request.data['id']

        prod = ProductModel.objects.get(pk=id)
        prod.delete()

        return HttpResponse({'message': 'Product deleted'})

class SensorViewset(viewsets.ModelViewSet):
    queryset = SensorModel.objects.all()
    serializer_class = SensorSerializer    
    search_fields = ['user_id__id']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class SensorValueViewset(viewsets.ModelViewSet):
    queryset = SensorValueModel.objects.all()
    serializer_class = SensorValueSerializer    
    search_fields = ['sensor_id__id']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class CustomUserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    search_fields = ['username']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]
