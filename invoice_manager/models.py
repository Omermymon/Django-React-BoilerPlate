from django.db import models

class Invoice(models.Model):
    reference = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('NOT_PAID', 'Not Paid'),
        ('PARTIALLY_PAID', 'Partially Paid'),
        ('PAID', 'Paid'),
    ], default='NOT_PAID')
    created_at = models.DateTimeField()
    due_date = models.DateTimeField()

    def __str__(self):
        return self.reference
