from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from webshop_app.views import ProductViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
