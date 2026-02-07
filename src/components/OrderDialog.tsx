import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useOrder } from './OrderContext';
import OrderForm from './OrderForm';

const OrderDialog = () => {
  const { isOpen, setIsOpen, closeOrder } = useOrder();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        ref={contentRef}
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-crimson/10 p-0 rounded-2xl"
      >
        <DialogTitle className="sr-only">Start Your Project</DialogTitle>
        <DialogDescription className="sr-only">
          Fill out the form to start your project with mal.aisolution
        </DialogDescription>
        <OrderForm onSubmitSuccess={closeOrder} />
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
