import json
from django.http.response import JsonResponse
from sqlalchemy import create_engine

from django.http import HttpResponse
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from sqlalchemy.sql.functions import user
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView



from .serializers import ProductSerializer, SensorSerializer, SensorValueSerializer
from .models import ProductModel, SensorModel, SensorValueModel


class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer    
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )
    # authentication_classes = [JWTAuthentication, ]
    # permission_classes = [IsAuthenticated, ]

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

def SensorApi():

    db_string = "postgresql://dosqjosb:HB9JBPLqY6G5M8Tn_mHrbFyq7r6bxk0y@hattie.db.elephantsql.com/dosqjosb"
    db = create_engine(db_string)

    user_id = 1
    sensor_result_set = db.execute(f"SELECT * FROM sensor where user_id={user_id}").all()

    sensor_ids = [x[0] for x in sensor_result_set]
    res = {}

    for sensor_id in sensor_ids:
        sensor_data_result_set = db.execute(f"SELECT * FROM sensor_data where sensor_id={sensor_id}").all()

        dt = []
        temp = []
        hum = []
        pres = []
        sensor = []

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
            "specs": list(sensor_result_set[sensor_id-1])
            }
        
        res[f'{sensor_id}'] = sensor

    return HttpResponse(json.dumps(res))

class SensorViewset(viewsets.ModelViewSet):
    queryset = SensorModel.objects.all()
    serializer_class = SensorSerializer    
    search_fields = ['user_id']
    filter_backends = (filters.SearchFilter, )
    # authentication_classes = [JWTAuthentication, ]
    # permission_classes = [IsAuthenticated, ]

class SensorValueViewset(viewsets.ModelViewSet):
    queryset = SensorValueModel.objects.all()
    serializer_class = SensorValueSerializer    
    search_fields = ['sensor_id']
    filter_backends = (filters.SearchFilter, )
    # authentication_classes = [JWTAuthentication, ]
    # permission_classes = [IsAuthenticated, ]