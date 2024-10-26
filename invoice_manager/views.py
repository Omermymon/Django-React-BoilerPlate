from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Invoice
from .serializers import CreateInvoiceSerializer, InvoiceSerializer
from rest_framework.decorators import action
from decimal import Decimal


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        invoice = self.get_object()
        payment_amount = request.data.get('payment_amount')

        print(f"Payment amount received: {payment_amount}")
        print(f"Current paid amount: {invoice.paid_amount}, Total amount: {invoice.amount}")

        if payment_amount:
            try:
                payment_amount = Decimal(payment_amount)
            except (ValueError, InvalidOperation):
                return Response({'error': 'Invalid payment amount'}, status=status.HTTP_400_BAD_REQUEST)

            invoice.paid_amount += payment_amount
            
            if invoice.paid_amount >= invoice.amount:
                invoice.status = 'PAID'
            else:
                invoice.status = 'PARTIALLY_PAID'

            invoice.save()
            return Response(InvoiceSerializer(invoice).data)

        return Response({'error': 'Invalid payment amount'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def create_invoice(self, request):
        serializer = CreateInvoiceSerializer(data=request.data)
        if serializer.is_valid():
            invoice = serializer.save()  # Save the new invoice
            return Response(InvoiceSerializer(invoice).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

