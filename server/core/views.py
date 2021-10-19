from .permissions import IsOwnerOrReadOnly
from rest_framework.viewsets import ModelViewSet
from .serializers import JobSerializer
from .models import Job


class JobViewSet(ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    # permission_classes = [IsOwnerOrReadOnly]
    # lookup_field = 'slug'
