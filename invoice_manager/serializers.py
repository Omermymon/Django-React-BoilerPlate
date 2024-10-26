from rest_framework import serializers
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

class CreateInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['reference', 'amount', 'paid_amount', 'status', 'due_date']  # Include the necessary fields
        read_only_fields = ['paid_amount', 'status']  # Set these fields as read-only
