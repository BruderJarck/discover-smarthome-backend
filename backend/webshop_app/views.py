from django.http import HttpResponse
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import ProductSerializer
from .models import ProductModel


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
