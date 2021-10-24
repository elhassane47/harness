from rest_framework import serializers
from .models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Skill
        fields = ('id', 'name')


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
            sk_id = skill.get('id', None)
            sk_name = skill.get('name', None)
            if sk_id:
                sk = Skill.objects.get(pk=sk_id)
                sk.name = sk_name
                sk.save()
            else:
                sk = Skill.objects.create(name=sk_name)

            instance.skills.add(sk)
        return super().update(instance, validated_data)
