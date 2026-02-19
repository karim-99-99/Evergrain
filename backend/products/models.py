"""
Product models with bilingual fields (EN/AR) and media (images/videos).
"""
from django.db import models


class Product(models.Model):
    """Product with full bilingual details."""

    # English
    title_en = models.CharField(max_length=255, blank=True)
    description_en = models.TextField(blank=True)
    short_description_en = models.TextField(blank=True)
    badge_en = models.CharField(max_length=100, blank=True)
    price_en = models.CharField(max_length=50, blank=True)
    features_en = models.JSONField(default=list, blank=True)  # list of strings

    # Arabic
    title_ar = models.CharField(max_length=255, blank=True)
    description_ar = models.TextField(blank=True)
    short_description_ar = models.TextField(blank=True)
    badge_ar = models.CharField(max_length=100, blank=True)
    price_ar = models.CharField(max_length=50, blank=True)
    features_ar = models.JSONField(default=list, blank=True)

    # Legacy/single fields (for compatibility)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    short_description = models.TextField(blank=True)
    badge = models.CharField(max_length=100, blank=True)
    price = models.CharField(max_length=50, blank=True)
    features = models.JSONField(default=list, blank=True)

    # Optional text fields
    dimensions = models.CharField(max_length=100, blank=True)
    weight = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title_en or self.title or f"Product #{self.id}"


class ProductMedia(models.Model):
    """Image or video for a product (order preserved)."""
    MEDIA_TYPE_IMAGE = 'image'
    MEDIA_TYPE_VIDEO = 'video'
    MEDIA_TYPES = [
        (MEDIA_TYPE_IMAGE, 'Image'),
        (MEDIA_TYPE_VIDEO, 'Video'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='media_items')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES, default=MEDIA_TYPE_IMAGE)
    # FileField for uploads; optional url for external links (YouTube, etc.)
    file = models.FileField(upload_to='products/%Y/%m/', blank=True, null=True)
    url = models.URLField(max_length=500, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def get_url(self, request=None):
        """Return URL for this media: file URL or external url."""
        if self.file:
            if request:
                return request.build_absolute_uri(self.file.url)
            return self.file.url
        return self.url or ''
