from rest_framework import routers
from .views import JobViewSet

app_name = 'api'

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet)

urlpatterns = router.urls