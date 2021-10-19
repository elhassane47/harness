from .permissions import IsOwnerOrReadOnly
from django.db.models import Count
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .serializers import JobSerializer, SkillSerializer
from .models import Job, Skill


class JobViewSet(ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    # permission_classes = [IsOwnerOrReadOnly]
    # lookup_field = 'slug'


class SkillsViewSet(ModelViewSet):
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()

    @action(detail=False)
    def top_skills(self, request):
        top_skills = Job.objects.values('skills__name').\
            annotate(count=Count('skills')).\
            order_by('-count')
        return Response(top_skills, status=status.HTTP_200_OK)
