"""
Load products from initial-products.json (removedIds + customProducts).
Media with type+url are stored as ProductMedia (url field). Does not upload files.
Usage: python manage.py load_products_json [--file path/to/initial-products.json]
"""
import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from products.models import Product, ProductMedia


def as_list(val):
    if val is None:
        return []
    return list(val) if isinstance(val, (list, tuple)) else [val]


def as_str(val, default=''):
    if val is None:
        return default
    return str(val).strip() if val else default


class Command(BaseCommand):
    help = 'Load products from initial-products.json (customProducts + media as URLs)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            default=None,
            help='Path to JSON file (default: ../../public/initial-products.json)',
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Delete existing products before importing',
        )

    def handle(self, *args, **options):
        file_path = options.get('file')
        if not file_path:
            # Default: repo/public/initial-products.json relative to backend/
            base = Path(__file__).resolve().parent.parent.parent.parent.parent
            file_path = base / 'public' / 'initial-products.json'
        else:
            file_path = Path(file_path)

        if not file_path.exists():
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
            return

        self.stdout.write(f'Reading {file_path} ...')
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception as e:
            self.stdout.write(self.style.ERROR(str(e)))
            return

        custom_products = as_list(data.get('customProducts'))
        if not custom_products:
            self.stdout.write(self.style.WARNING('No customProducts in file.'))
            return

        if options.get('clear'):
            Product.objects.all().delete()
            self.stdout.write('Cleared existing products.')

        created = 0
        with transaction.atomic():
            for item in custom_products:
                product_id = item.get('id')
                if product_id is not None and Product.objects.filter(id=product_id).exists():
                    continue  # skip if id exists (avoid duplicate)
                product = Product(
                    title_en=as_str(item.get('title_en')),
                    title_ar=as_str(item.get('title_ar')),
                    description_en=as_str(item.get('description_en')),
                    description_ar=as_str(item.get('description_ar')),
                    short_description_en=as_str(item.get('shortDescription_en') or item.get('short_description_en')),
                    short_description_ar=as_str(item.get('shortDescription_ar') or item.get('short_description_ar')),
                    badge_en=as_str(item.get('badge_en')),
                    badge_ar=as_str(item.get('badge_ar')),
                    price_en=as_str(item.get('price_en')),
                    price_ar=as_str(item.get('price_ar')),
                    features_en=as_list(item.get('features_en')),
                    features_ar=as_list(item.get('features_ar')),
                    title=as_str(item.get('title_en') or item.get('title')),
                    description=as_str(item.get('description_en') or item.get('description')),
                    short_description=as_str(item.get('shortDescription_en') or item.get('short_description')),
                    badge=as_str(item.get('badge_en') or item.get('badge')),
                    price=as_str(item.get('price_en') or item.get('price')),
                    features=as_list(item.get('features_en') or item.get('features')),
                )
                product.save()
                media_list = as_list(item.get('media'))
                for idx, m in enumerate(media_list):
                    if not isinstance(m, dict):
                        continue
                    mtype = (m.get('type') or 'image').lower()
                    if mtype not in ('image', 'video'):
                        mtype = 'image'
                    url = as_str(m.get('url'))
                    ProductMedia.objects.create(
                        product=product,
                        media_type=mtype,
                        url=url or '',
                        order=idx,
                    )
                created += 1

        self.stdout.write(self.style.SUCCESS(f'Imported {created} products.'))
