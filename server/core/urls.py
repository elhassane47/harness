from rest_framework import routers
from .views import JobViewSet, SkillsViewSet

app_name = 'api'

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'skills', SkillsViewSet)

urlpatterns = router.urls