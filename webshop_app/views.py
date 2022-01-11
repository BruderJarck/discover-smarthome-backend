from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import decorators

from .serializers import ProductSerializer, SensorSerializer, SensorValueSerializer, PrivateUserSerializer, PublicUserSerializer
from .models import ProductModel, SensorModel, SensorValueModel

User = get_user_model()


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
    serializer_class = PublicUserSerializer
    search_fields = ['username']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

@decorators.api_view(['POST'])
@decorators.permission_classes([AllowAny])
def register_new_user(request):
    serializer = PrivateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=201)
    return Response(serializer.errors, status=400)

@decorators.api_view(['GET'])
@decorators.permission_classes([AllowAny])
def verifiy_user(request):

    serializer = PrivateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=201)
    return Response(serializer.errors, status=400)