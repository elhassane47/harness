from rest_framework import serializers
from .models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Job
        fields = 'id', 'title', 'description', 'skills'
        read_only_fields = ('id', 'created_at', 'updated_at', 'slug',)

    def create(self, validated_data):
        skills_data = validated_data.pop('skills')
        job = Job.objects.create(**validated_data)
        for skill in skills_data:
            obj, created = Skill.objects.get_or_create(**skill)

            job.skills.add(obj)
        return job

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills')
        for skill in skills_data:
            obj, created = Skill.objects.get_or_create(**skill)
            instance.skills.add(obj)
        return super().update(instance, validated_data)
