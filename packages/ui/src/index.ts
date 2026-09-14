// Core components
export { Button, type ButtonProps } from "./components/core/button";
export { Input, type InputProps } from "./components/core/input";
export { Select, type SelectProps, type SelectOption } from "./components/core/select";
export { Card, CardHeader, CardContent, CardFooter, type CardProps } from "./components/core/card";
export { Badge, type BadgeProps } from "./components/core/badge";
export { Textarea, type TextareaProps } from "./components/core/textarea";
export { Switch, type SwitchProps } from "./components/core/switch";
export { Avatar, type AvatarProps } from "./components/core/avatar";
export { Separator, type SeparatorProps } from "./components/core/separator";
export { Alert, type AlertProps } from "./components/core/alert";
export { Tabs, TabList, TabTrigger, TabContent, type TabsProps, type TabListProps, type TabTriggerProps, type TabContentProps } from "./components/core/tabs";
export { Dialog, DialogHeader, DialogContent, DialogFooter, type DialogProps } from "./components/core/dialog";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, type AccordionProps, type AccordionItemProps, type AccordionTriggerProps, type AccordionContentProps } from "./components/core/accordion";
export { Dropdown, type DropdownProps, type DropdownItem } from "./components/core/dropdown";
export { Tooltip, type TooltipProps } from "./components/core/tooltip";

// Brazil components
export { CPFInput, type CPFInputProps } from "./components/brazil/cpf-input";
export { CEPInput, type CEPInputProps, type CEPAddress } from "./components/brazil/cep-input";
export { CurrencyBRL, type CurrencyBRLProps } from "./components/brazil/currency-brl";
export { PhoneBR, type PhoneBRProps } from "./components/brazil/phone-br";
export { CNPJInput, type CNPJInputProps } from "./components/brazil/cnpj-input";
export { StateSelect, type StateSelectProps, type BrazilianState } from "./components/brazil/state-select";

// Payment components
export { PixPayment, type PixPaymentProps, type PixPaymentStatus } from "./components/payments/pix-payment";
export { InstallmentSelect, type InstallmentSelectProps, type InstallmentOption } from "./components/payments/installment-select";

// Utilities
export { maskCPF, maskCNPJ, maskCEP, maskPhone, maskBRL } from "./utils/masks";
export { validateCPF, validateCNPJ, validateCEP, validatePhone } from "./utils/validators";
export { formatBRL, formatCPF, formatCNPJ, formatCEP, formatInstallments } from "./utils/formatters";
export { generateQR } from "./utils/qrcode";
