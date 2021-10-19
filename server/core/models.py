from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

EXPERIENCE_CHOICE = (
    (0, 'Junior'),
    (1, 'Mid Level'),
    (1, 'Senior'),
)

CONTRACT_TYPE = (
    (0, 'Full Time'),
    (1, 'Part Time'),
)


class Job(models.Model):
    posted_by = models.ForeignKey(User, related_name='posted_by', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    salary = models.DecimalField(max_digits=6, decimal_places=2, help_text="Annual Salary", null=True)
    experience = models.IntegerField(default=0, choices=EXPERIENCE_CHOICE, null=True)
    type = models.IntegerField(default=0, choices=CONTRACT_TYPE, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    slug = models.SlugField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Job, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.posted_by} : {self.title}'
