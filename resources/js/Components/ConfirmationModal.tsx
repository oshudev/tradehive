import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';

interface ConfirmationModalProps {
  title: string;
  description: string;  
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void; 
  onConfirm: () => void; 
  confirmText?: string; 
  cancelText?: string; 
}

export default function ConfirmationModal({
  title,
  description,
  isOpen,
  setIsOpen,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">{title}</h2>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
