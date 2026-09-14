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
export { Marquee, type MarqueeProps } from "./components/core/marquee";
export { NumberTicker, type NumberTickerProps } from "./components/core/number-ticker";
export { AnimatedList, type AnimatedListProps } from "./components/core/animated-list";
export { BentoGrid, BentoCard, type BentoGridProps, type BentoCardProps } from "./components/core/bento-grid";
export { AvatarCircles, type AvatarCirclesProps, type AvatarCircle } from "./components/core/avatar-circles";
export { BorderBeam, type BorderBeamProps } from "./components/core/border-beam";
export { ShimmerButton, type ShimmerButtonProps } from "./components/core/shimmer-button";
export { MagicCard, type MagicCardProps } from "./components/core/magic-card";
export { TypingAnimation, type TypingAnimationProps } from "./components/core/typing-animation";
export { DotPattern, type DotPatternProps } from "./components/core/dot-pattern";
export { RetroGrid, type RetroGridProps } from "./components/core/retro-grid";
export { Skeleton, SkeletonGroup, type SkeletonProps, type SkeletonGroupProps } from "./components/core/skeleton";
export { Progress, StepProgress, type ProgressProps, type StepProgressProps } from "./components/core/progress";

// Brazil components
export { CPFInput, type CPFInputProps } from "./components/brazil/cpf-input";
export { CEPInput, type CEPInputProps, type CEPAddress } from "./components/brazil/cep-input";
export { CurrencyBRL, type CurrencyBRLProps } from "./components/brazil/currency-brl";
export { PhoneBR, type PhoneBRProps } from "./components/brazil/phone-br";
export { CNPJInput, type CNPJInputProps } from "./components/brazil/cnpj-input";
export { StateSelect, type StateSelectProps, type BrazilianState } from "./components/brazil/state-select";
export { PIXKeyInput, type PIXKeyInputProps, type PixKeyType } from "./components/brazil/pix-key-input";

// Payment components
export { PixPayment, type PixPaymentProps, type PixPaymentStatus } from "./components/payments/pix-payment";
export { InstallmentSelect, type InstallmentSelectProps, type InstallmentOption } from "./components/payments/installment-select";
export { BoletoDisplay, type BoletoDisplayProps } from "./components/payments/boleto-display";

// Utilities
export { maskCPF, maskCNPJ, maskCEP, maskPhone, maskBRL } from "./utils/masks";
export { validateCPF, validateCNPJ, validateCEP, validatePhone } from "./utils/validators";
export { formatBRL, formatCPF, formatCNPJ, formatCEP, formatInstallments } from "./utils/formatters";
export { generateQR } from "./utils/qrcode";
