import { createContext, useContext, useState, ReactNode } from 'react';

interface OrderContextType {
  isOpen: boolean;
  openOrder: () => void;
  closeOrder: () => void;
  setIsOpen: (open: boolean) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        openOrder: () => setIsOpen(true),
        closeOrder: () => setIsOpen(false),
        setIsOpen,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};
